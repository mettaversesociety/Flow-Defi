import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import db from './init'

const _ = require('lodash')

export default {
    createProfile(userUID) {
        console.log('createProfile')
        if (userUID !== '') {
            db.collection('profiles')
                .doc(userUID)
                .set({
                    userUID,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    sessions: firebase.firestore.FieldValue.increment(1), // Number of logins
                    rank: 0, // Belt
                    xp: 0, // Experience points
                    totalPoints: 0, // Fantasy Points
                    lastPoints: 0, // Fantasy Points
                    eventsEntered: 0, // tournament events
                    arcadePlayed: 0, // total arcade games played
                    achievements: [], // Torno won, unlocked
                    onBoardered: false, //completed onboarding
                    FlowAddress: '', // Flow address,
                    walletlessAddress: '', // walletless address,
                    teams: [], // Fantasy Teams
                    accountType: 0, // Account type 0 free, 1 paid
                    country: 0, // User origin  0 free, 1 paid
                    locale: '', // used for timezone and formatting
                    age: 0, // Birthdate
                    bio: '', // User free text profile bio
                })
                .then(() => {
                    console.log('Profile successfully created!')
                })
                .catch(error => {
                    console.error('Error writing profile: ', error)
                })
        }
    },
    async readUsersProfile(userUID) {
        let profileData = {}
        await db.collection('profiles')
            .doc(userUID)
            .get()
            .then(doc => {
                profileData = doc.data()
            })
            .catch(error => {
                console.log('Error getting documents: ', error)
            })

        return profileData
    },
    async updateUsersProfile(user, fields) {
        const profileData = fields
        profileData.modified = firebase.firestore.FieldValue.serverTimestamp()
        await db.collection('profiles')
            .doc(user.uid)
            .update(profileData)
            .then(profile => profile)
            .catch(error => {
                console.log(error)
            })
    },

    async getDapperNfts(userUid, dapperAddress, collectionName, collectionAddress) {
        fcl.config({
            'discovery.wallet': 'https://accounts.meetdapper.com/fcl/authn-restricted',
            'discovery.wallet.method': 'POP/RPC',
            'accessNode.api': 'https://access-mainnet-beta.onflow.org',
            'app.detail.title': 'Flows got Talend',
            'app.detail.icon': 'https://FlowsGotTalet/logo.png',
        })

        // get owned NFT metadata
        const idsResponse = await fcl.send([
            fcl.script`
          import ${collectionName} from ${collectionAddress}
          pub struct MetadataCollections {

            pub let items: {String : MetadataCollectionItem}
            pub let collections: {String : [String]}

            init(items: {String : MetadataCollectionItem}, collections: {String : [String]}) {
              self.items=items
              self.collections=collections
              }
          }

          pub struct MetadataCollection{
            pub let type: String
            pub let items: [MetadataCollectionItem]

            init(type:String, items: [MetadataCollectionItem]) {
                self.type=type
                self.items=items
                }
          }

          pub struct MetadataCollectionItem {
            pub let id:UInt64
            pub let name: String
            pub let image: String
            pub let url: String
            pub let listPrice: UFix64?
            pub let listToken: String?
            pub let mintQty: UInt32
            pub let setId: UInt32
            pub let seriesId: UInt32
            pub let metadata: {String: String}


            init(id:UInt64, name:String, image:String, url:String, listPrice: UFix64?, listToken:String?,  mintQty: UInt32, setId: UInt32, seriesId: UInt32, metadata: {String: String}) {
              self.id=id
              self.name=name
              self.url=url
              self.image=image
              self.listToken=listToken
              self.listPrice=listPrice
              self.mintQty=mintQty
              self.setId=setId
              self.seriesId=seriesId
              self.metadata=metadata
              }
            }

          pub fun main(account: Address): MetadataCollections? {
            let resultMap : {String : MetadataCollectionItem} = {}
            let results : {String :  [String]}={}
            let acct = getAccount(account)
            let collectionRef = acct.getCapability<&${collectionName}.Collection{${collectionName}.${collectionName}CollectionPublic}>(${collectionName}.CollectionPublicPath)
            let collection = collectionRef.borrow()!
            let items: [String] = []
            for id in collection.getIDs() {
                  let nft = collection.borrow${collectionName}(id: id)!
                  let metadata = ${collectionName}.getSetMetadata(setId: nft.setId)!
                  let seriesId = ${collectionName}.getSetSeriesId(setId: nft.setId)!
                  let image = metadata["image"]!
                  let data = ${collectionName}.getSetMaxEditions(setId: nft.setId)!
                  let contentType="video"
                  let item = MetadataCollectionItem(
                      id: id,
                      name: metadata["name"]!,
                      image: image,
                      listPrice: nil,
                      listToken: nil,
                      mintQty: ${collectionName}.getSetMaxEditions(setId: nft.setId)!,
                      setId: nft.setId,
                      seriesId: seriesId,
                      metadata: metadata
                      )

                  let itemId="${collectionName}".concat(id.toString())
                  items.append(itemId)
                  resultMap[itemId] = item
            }

            if items.length != 0 {
              results["${collectionName}"] = items
            }
            return MetadataCollections(items: resultMap, collections:results)
          }
        `,
            fcl.args([fcl.arg(dapperAddress, t.Address)]),
        ])
        const myDapperNFTs = await fcl.decode(idsResponse)
        return myDapperNFTs
    },

}

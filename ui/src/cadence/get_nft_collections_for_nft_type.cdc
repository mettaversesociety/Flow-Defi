import NFTCatalog from "`${NFTCatalogAddress}`"

pub fun main(nftTypeIdentifer: String): {String : Bool}? {
    return NFTCatalog.getCollectionsForType(nftTypeIdentifier: CompositeType(nftTypeIdentifer)!.identifier)
}

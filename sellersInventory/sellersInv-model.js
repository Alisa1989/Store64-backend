let db = require("../data/config");

//get all sellersInventory entries
function getSellersInventoryEntries(query = {}) {
    const { page = 1, limit = 100, sortBy = "sellerID", sortDir = "asc" } = query;
    const offset = limit * (page - 1);
  
    return db("sellersInventory")
      .orderBy(sortBy, sortDir)
      .limit(limit)
      .offset(offset)
      .select();
  }

//get sellersInventory entry
async function getSellersInventoryEntry(sellerID, productID) {
    return db("sellersInventory").where("sellerID", sellerID).andWhere("productID", productID);
}
  
//create sellersInventory entry
async function createSellersInventoryEntry(sellerID, productID){
    await db("sellersInventory").insert({sellerID, productID});
    return getSellersInventoryEntry(sellerID, productID);
}

//update sellersInventory entry
//delete sellersInventory entry

module.exports = {
    getSellersInventoryEntries,
    getSellersInventoryEntry,
    createSellersInventoryEntry
}
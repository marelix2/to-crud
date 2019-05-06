const publicRoutes = {
  'GET /tables': 'TableController.getTables',
  'POST /table/row': 'TableController.updateRow',
  'PUT /table/rows' : 'TableController.getTableRows',
  'PUT /table/headers' : 'TableController.getTableHeaders'
}


module.exports = publicRoutes;
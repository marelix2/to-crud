const publicRoutes = {
  'GET /tables': 'TableController.getTables',
  'POST /table/row': 'TableController.updateRow',
  'GET /table/rows' : 'TableController.getTableRows'
}


module.exports = publicRoutes;
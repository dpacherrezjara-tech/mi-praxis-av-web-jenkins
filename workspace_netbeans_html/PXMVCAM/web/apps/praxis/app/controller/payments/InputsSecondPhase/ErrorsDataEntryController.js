Ext.define('Ext.Praxis.controller.payments.InputsSecondPhase.ErrorsDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorsDataEntryController',
    request: axios.create({
        baseURL: CONTEXTPATH + '/InputsPhase2',
        timeout: 0
      }),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadLogger();
    },
    loadLogger: async function(){
        const me = this;
        const grid = Ext.getCmp(prototype.idDE2 + '-errorLogger');
        try {
            grid.setLoading(true);
            const res = await me.request.get('searchFileErrors',{
                params: me.view.searchParams
            });
            const {response} = res.data;
            
            if (response.length === 0){
                global.Msg({
                    msg:'No data'
                });
                me.view.close();
                return;
            }
            let store = new Ext.data.Store({
                pageSize: 10, // Número de registros por página
                data: response,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            grid.setStore(store);
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
            me.view.center();
        }

    },
    onCancelClick: function () {
        this.view.close();
    }
});
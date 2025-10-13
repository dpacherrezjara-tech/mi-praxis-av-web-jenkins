Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeadersReportController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    requestMisc: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    filters: [],
    init: function (view) {
    },
    afterRender: async function () {
      //  await this.loadFilters();
       // this.onClickSearchBtn();
    },
    loadFilters: async function () {
        const me = this;
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilter.setLoading(true);
        try {
            const res = await me.requestMisc.get('loadMdpFilters');
            if (res.status === 200) {
                me.filters = res.data;
                const cmbProc = Ext.getCmp(prototype.id + '-cmbCODPRO');
                global.setComboStore(cmbProc, me.filters.PROCESADORES, 'CODE', 'NAME', '');
            }
        } catch (e) {
            console.error(e);
        } finally {
            panelFilter.setLoading(false);
        }
    },
    onClickSearchBtn: function () {
        const me = this;
        const params = me.formatParams();
        
        console.log("params: ", params)
        console.log("filters: ", me.filters)

        // Detectar qué vista está activa
        const isHeadersVisible = !Ext.getCmp(prototype.id + '-viewHeaders').hidden;
        const isSequenceVisible = !Ext.getCmp(prototype.id + '-viewSecuence').hidden;

        // Si estamos en Headers
        if (isHeadersVisible) {
            const headersContainer = Ext.getCmp(prototype.id + '-HeadersGrid');
            headersContainer.removeAll();
            const grid = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
                id: prototype.id + '-HeadersGridCmp',
                searchParams: params,
                filters: me.filters
            });
            headersContainer.add(grid);
        }

        // Si estamos en Sequence
        if (isSequenceVisible) {
            const sequenceContainer = Ext.getCmp(prototype.id + '-SequencesGrid');
            sequenceContainer.removeAll();
            const grid = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid', {
                id: prototype.id + '-SequencesGridCmp',
                searchParams: params,
                filters: me.filters
            });
            sequenceContainer.add(grid);
        }
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
    },
    formatParams: function () {
        const filters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return filters.getValues();
    },
    onProcessClick:function(){
        const win = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.DownloadHeadersDataEntry',{
            id: prototype.id + '-DownloadHeadersDataEntry-1'
        });
        win.show();
    },
    onChangeView: function(field, newValue){
        if(newValue.opcion === '1'){
            Ext.getCmp(prototype.id + '-viewHeaders').show();
            Ext.getCmp(prototype.id + '-viewSecuence').hide();
            Ext.getCmp(prototype.id + '-viewDayPilot').hide();   
            Ext.getCmp(prototype.id + '-panelFilters').show(); 
        } else if (newValue.opcion === '2') {
            Ext.getCmp(prototype.id + '-viewHeaders').hide();
            Ext.getCmp(prototype.id + '-viewSecuence').show();
            Ext.getCmp(prototype.id + '-viewDayPilot').hide();  
            Ext.getCmp(prototype.id + '-panelFilters').show(); 

        } else if(newValue.opcion === '3'){
            Ext.getCmp(prototype.id + '-viewHeaders').hide();
            Ext.getCmp(prototype.id + '-viewSecuence').hide();
            Ext.getCmp(prototype.id + '-viewDayPilot').show();  
            Ext.getCmp(prototype.id + '-dayPilotCmp').show();
            Ext.getCmp(prototype.id + '-panelFilters').hide(); 
        }
    }
});
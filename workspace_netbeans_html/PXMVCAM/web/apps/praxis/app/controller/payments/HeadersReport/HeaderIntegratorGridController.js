Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeaderIntegratorGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeaderIntegratorGridController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
        if (!view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
           
            tbar.items.items[1].hide();
        }
    },
    afterRender: async function () {
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        const params = {
            ...view.searchParams,
            IN_FILEID:'',
            IN_MODE:'M'
        };
        let store = global.callStorePaggin('PRAXISMP','MPS294',params);
        view.setStore(store);
    },
    
    onClickDelivery: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        
        if (record.data.FILETYPE.trim() !== 'REJECTED') {
            global.Msg({msg: 'No data'});
            return;
        }
        let qtyrow = '';
        let fileid = '';
        if (record.data.FILETYPE){
            qtyrow = record.data.FILETYPE;
            fileid = record.data.FILEID;
        }
        me.openDelivery(qtyrow,fileid);
    },
    
    openDelivery: function (qtyrow,fileid) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-contentIntegrator');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        
        let params = Object.assign({},me.view.searchParams);
        params.IN_FILEID = fileid;
        const panelDelivery = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.DeliveryGrid', {
            id: prototype.id + '-DeliveryGrid-1',
            url: prototype.url,
            searchParams: params,
            backButton: true
        });
        mainPanel.add(panelDelivery);
    },

    
    onClickFormateo: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const view = me.view;
        
        if (record.data.FILETYPE.trim() !== 'REJECTED') {
            global.Msg({msg: 'No data'});
            return;
        }
        let qtyrow = '';
        let fileid = '';
        if (record.data.FILETYPE){
            qtyrow = record.data.FILETYPE;
            fileid = record.data.FILEID;
        }
        me.openFormateo(qtyrow,fileid);
    },
    
     openFormateo: function (qtyrow,fileid) {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-contentIntegrator');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        let params = Object.assign({},me.view.searchParams);
        params.IN_FILEID = fileid;
        const panelFormateo= Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.FormateoGrid', {
            id: prototype.id + '-FormateoGrid-1',
            url: prototype.url,
            searchParams: params,
            backButton: true
        });
        mainPanel.add(panelFormateo);
    },
    
    
    


    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
//                            global.downloadFile2(me.request, 'downloadHeaders', me.view.searchParams);
                            this.onDownloadExcel();
                        }
                    }
                });
    },
    
     onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        
        const statusMap = {
        'L': 'CARGADO',
        'F': 'FORMATEO',
        'P': 'PROCESADO️',
        'E': 'ERROR'
        };
        
        const statusMap2 = {
        '': '',
        '1': 'TOTAL',
        '2': 'PARTIAL'
        };

        const columns = [
            {header: "RN", dataIndex: "RN"},
            {header: "File ID", dataIndex: "FILEID"},
            {header: 'Status', dataIndex: 'STPRO',  formatter: v => statusMap[v] ?? v },
            {header: 'Process Status', dataIndex: 'STCAR',  formatter: v => statusMap2[v] ?? v },
            {header: "Corrl", dataIndex: "CORRL"},
            {header: "File Type", dataIndex: "FILETYPE"},
            {header: "File Name", dataIndex: "FILENAME"},
            {header: "Qty Rows", dataIndex: "QTYROWS"}
        ];

        console.log('view.searchParams excel', view.searchParams);
        const params = {
            ...view.searchParams,
            IN_FILEID:'',
            IN_MODE: 'M',
            IN_DATEF: view.searchParams.IN_DATEF,
            IN_DATET: view.searchParams.IN_DATET,
            IN_FILENAME: '',
            IN_FILEREF: '',
            IN_STATUS: ''
        };


        await global.exportExcelFromStore(
                "PRAXISMP",
                "MPS294",
                params,
                columns,
                "Integrator Information"
                );
    }
});
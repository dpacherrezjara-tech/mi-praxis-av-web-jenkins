Ext.define('Ext.Praxis.controller.payments.HeadersReport.FormateoGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormateoGridController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        const params = {
            ...view.searchParams,
            IN_MODE: 'F',
            IN_DATEF: '',
            IN_DATET: '',
            IN_FILENAME: '',
            IN_FILEREF: '',
            IN_STATUS: ''
        };
        let store = global.callStorePaggin('PRAXISMP', 'MPS294', params);
        view.setStore(store);
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
        'N': 'NO PROCESSED',
        'Y': 'PROCESSED'
        }; 
        const columns = [
            {header: "RN", dataIndex: "RN"},
            {header: "File ID", dataIndex: "FILEID"},
            {header: "Date", dataIndex: "VALDATE"},
            {header: "Seq", dataIndex: "SEQ"},
            {header: "Status", dataIndex: "STPRO",  formatter: v => statusMap[v] ?? v },
            {header: "Error Desc.", dataIndex: "DESCERR"},
            {header: "Creation Date", dataIndex: "FECR"},
            {header: "Creation Time", dataIndex: "HOCR"}
        ];

        console.log('view.searchParams excel', view.searchParams);
        const params = {
            ...view.searchParams,
            IN_MODE: 'F',
            IN_DATEF: '',
            IN_DATET: '',
            IN_FILENAME: '',
            IN_FILEREF: '',
            IN_STATUS: ''
        };


        await global.exportExcelFromStore(
                "PRAXISMP",
                "MPS294",
                params,
                columns,
                "Formated Information"
                );
    }


});
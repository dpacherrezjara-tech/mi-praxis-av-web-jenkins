Ext.define('Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReverseAccountingGridController',
    url: CONTEXTPATH + '/ReverseAccounting',
    request: axios.create({
        baseURL: CONTEXTPATH + '/ReverseAccounting',
        timeout: 20000
    }),
    notifier: new AWN(),
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-main-btnBack').show();
            Ext.getCmp(prototype.id + '-main-btnBack').on('click', view.backButton);
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: function (view) {
        const me = this;
        let store = global.callStorePaggin('PRAXISMP', 'SPRAC001', view.searchParams);
        view.setStore(store);
    },
    onMaintenanceReject: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {IDCONT, BANDOC, DATECI, TRANCI} = record.data;
        let params = {
            IN_IDCONT: IDCONT,
            IN_BANDOC: BANDOC,
            IN_DATECI: DATECI,
            IN_TRANCI: TRANCI
        };
        const dateEntry = Ext.create('Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ReverseAccountingDataEntry', {
            id: prototype.id + '-ReverseAccountingDataEntry-1',
            searchParams: params
        });
        dateEntry.show();
    },
    onDownloadExcel: async function () {
        const me = this;
        me.view.setLoading(true);
        let data = await global.callStorePagginExcel('PRAXISMP', 'SPRAC001', me.view.searchParams);
        console.log(data);
        const strejMap = {
            R: "Rejected",
            J: "Justified",
            P: "Re-Process"
        };

        const streviMap = {
            Y: "Audited",
            N: "Pending"
        };

        const stsapMap = {
            L: "Audited",
            P: "Pending"
        };

        let excelData = data.map(obj => (
                    {
                        "Type": obj.TIPOCON,
                        "Accounting ID": obj.IDCONT,
                        "Header": obj.HEADER,
                        "Processor": obj.DESC_PRO,
                        "Bank Doc.": obj.BANDOC,
                        "Reference": obj.REFER,
                        "Reject User": obj.USCR,
                        "Reject Datetime": global.formatTimeStamp(obj.TSCR),
                        "Reject Type": strejMap[obj.STREJ] || '',
                        "Rejected Code": obj.CODREC,
                        "Rejected Message": obj.OBSERV,
                        "Solved Status": streviMap[obj.STREVI] || '',
                        "Solved Message": obj.BPOCOMM,
                        "Solved User": obj.USUP,
                        "Solved Datetime": global.formatTimeStamp(obj.TSUP),
                        "SAP Status": stsapMap[obj.STSAP] || ''
                    }));

        await global.writeExcelFromJson(excelData, 'Rejections Report');

        me.view.setLoading(false);
    }
});
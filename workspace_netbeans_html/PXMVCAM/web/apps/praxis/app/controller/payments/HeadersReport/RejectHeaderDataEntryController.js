Ext.define('Ext.Praxis.controller.payments.HeadersReport.RejectHeaderDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectHeaderDataEntryController',
    notifier: new AWN(),
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    soportes: [],
    init: function (view) {
    },
    afterRender: async function () {
        this.soportes = [];
    },
    onRejectClick: async function () {
        const me = this;
        let txtReject = Ext.getCmp(prototype.idDErej + '-textReject');
        if (txtReject.value === '') {
            me.notifier.alert('Insert a Comment to Reject');
            return;
        }

        const fileForm = Ext.getCmp(prototype.idDErej + '-supportFiles');
        const {idCont, header, status} = me.view.obj;

        if (me.soportes.length > 0) {
            me.view.setLoading(true);
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.view.obj.rejected);
            let username = document.getElementById('menuUser').textContent;

            let params = {
                IN_IDCONT: idCont,
                IN_HEADER: header,
                IN_STATUS: status,
                IN_MAILBODY: txtReject.value,
                IN_USER: username,
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid
            };

            const formData = new FormData();

            me.soportes.forEach(x => {
                formData.append('files', x);
            });

            formData.append('params', JSON.stringify(params));

            const res = await me.request.post(`/maintenanceHeader`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            me.notifier.info('Header Updated');
            me.view.setLoading(true);
        } else {
            me.notifier.alert('Error on Maintenance');
        } 
        me.view.reloadForm();
        me.view.close();
    },
    onCancelClick: function () {
        this.view.close();
    },
    selectFile: async function (filefield, value, eOpts) {
        const me = this;
        me.view.setLoading(true);
        const soportes = filefield.fileInputEl.dom.files;
        if (soportes.length > 0) {

            for (let x of soportes) {
                const yaExiste = me.soportes.some(item => item.name === x.name);
                if (!yaExiste) {
                    me.soportes.push(x);
                }
            }
        }
        me.loadStoreFiles();
        //filefield.reset();
        me.view.setLoading(false);
    },
    onDeleteFile: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {FILENAM} = record.data;
        const me = this;
        me.soportes = me.soportes.filter(x => x.name !== FILENAM);
        me.loadStoreFiles();
    },
    loadStoreFiles: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idDErej + '-gridSupports');
        if (me.soportes.length > 0) {
            grid.show();
            let data = me.soportes.map(x => ({FILENAM: x.name}));

            grid.setStore(new Ext.data.Store({data: data}));
        } else {
            grid.hide();
            grid.setStore([]);
        }
    }
});
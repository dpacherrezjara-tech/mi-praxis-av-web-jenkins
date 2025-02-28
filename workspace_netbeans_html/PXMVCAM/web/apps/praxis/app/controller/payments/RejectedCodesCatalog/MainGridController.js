Ext.define('Ext.Praxis.controller.payments.RejectedCodesCatalog.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainGridController',
    url: CONTEXTPATH + '/RejectedCodesCatalog',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/RejectedCodesCatalog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadMain();
    },
    loadMain: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.get('loadMain', {
                params: me.view.searchParams
            });
            let store = new Ext.data.Store({
                data: res.data.response
            });
            me.view.setStore(store);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },
    onUpdateRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        global.cleanPXobj(record.data);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.RejectedCodesForm.DataEntrys.CodeMaintenanceDataEntry', {
            id: prototype.id + '-CodeMaintenanceDataEntry-1',
            option: 'U',
            obj: record.data,
            reloadGrid: ()=>{
                me.loadMain();
            }
        });
        dataEntry.show();
    },
    onDeleteRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.deleteRecord(record.data);
                        }
                    }
                });
    },
    deleteRecord: async function (rec) {
        const me = this;
        me.view.mask('Loading...');
        try {
            const res = await me.request.post('maintenance', {
                IN_OPTION: 'D',
                IN_CODREC: rec.CODREC
            });
            if (res.status === 201) {
                me.notifier.success('Deleted Successfully');
            } else {
                me.notifier.alert('Error on Delete');
            }
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.unmask();
            me.loadMain();
        }
    }
});
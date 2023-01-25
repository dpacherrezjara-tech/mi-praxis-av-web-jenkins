Ext.define('Ext.Praxis.controller.payments.ReconciliationPayment.DataGridMsiTrackingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataGridMsiTrackingController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meGrid: '',
    bean: {},
    beanMsi: {},
    paramsMsiTracking: {},
    init: function (view) {
        prototype.id = 'ReconciliationPaymentForm';
        prototype.url = CONTEXTPATH + '/ReconciliationPayment';
        meGrid = this;
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        this.getData();
    },
    getData: function () {
        meGrid.paramsMsiTracking.beanString = JSON.stringify(this.bean);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMsiTracking'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...');
                    obj.proxy.extraParams = meGrid.paramsMsiTracking;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMsiTracking').bindStore(storeGridDatas);
    },
    onMsiUpdateClick: function (btn) {
        var beanMsiTemp = {};

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            meGrid.llenarData(beanMsiTemp);
                        }
                    }
                });
    },
    llenarData: function (beanMsiTemp) {
        beanMsiTemp.lstSendManual = [];
        var store_gridMsi = Ext.getCmp(prototype.id + '-gridMsiTracking').getStore();

        for (var i = 0; i < store_gridMsi.data.length; i++) {
            beanMsiTemp.lstSendManual.push(store_gridMsi.data.items[i].data);
        }
        
        console.log(beanMsiTemp);
        this.MaintenanceMsi(beanMsiTemp);
    },
    MaintenanceMsi: function (beanMsiTemp) {
//        console.log(beanMsiTemp);
        var beanString = JSON.stringify(beanMsiTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMsi',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridMsiTracking').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    global.Msg({msg: 'Successfully updated'});
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();
                    Ext.getCmp(prototype.id + '-msiTrackingGrid').close();
                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }

            }
        });
    },
    onMsiCancelClick: function(){
        Ext.getCmp(prototype.id + '-msiTrackingGrid').close();
    }
});
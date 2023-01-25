Ext.define('Ext.Praxis.controller.screens.CtrlTktFCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlTktFCController',
    bean: {},
    actionCode: '',
    lstTKT_FC: new Array(),
    init: function(view) {
        prototype.TktFC = {
            id: 'CtrlTktFCForm',
            url: CONTEXTPATH+'/CtrlTktFC'
        };
    },
    afterRender: function() {
        this.loadTicket_FC(this.bean);
    },
    //<editor-fold defaultstate="collapsed" desc="loadTicket_FC">
    loadTicket_FC: function (bean) {
        var me01 = this;
        Ext.Ajax.request({
            url: prototype.TktFC.url + '/loadTicket_FC',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('CtrlTktFCForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('CtrlTktFCForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me01.lstTKT_FC = res.lstTKT_FC;
                    var strTexto = '';
                    for(var i=0;i<me01.lstTKT_FC.length;i++){
                        me01.bean = me01.lstTKT_FC[i];
                        strTexto+=me01.bean.A1721FRCA;
                    }
                    Ext.getCmp(prototype.TktFC.id+'-txaFC').setValue(strTexto);
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('CtrlTktFCForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

});



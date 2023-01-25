Ext.define('Ext.Praxis.controller.program.CtrlControlLoadARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlControlLoadARCController',
    bean: {},
    PROCESS_OK: 0,
    PROCESS_ERROR: 1,
    init: function(view) {
        prototype.ControlLoadARC = {
            id: 'CtrlControlLoadARCForm',
            url: CONTEXTPATH+'/CtrlControlLoadARC'
        };
    },
    startDisplay: function () {
        me.processLoadARCHOT(this.bean);
        Ext.getCmp(prototype.ControlLoadARC.id+'-btnAccept').hide();
        Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('');
    },
    btnAccept_clickHandler: function () {
        Ext.getCmp('CtrlControlLoadARCForm').hide();
    },
    displayMesagge: function (process) {
        switch(process){
            case this.PROCESS_OK:
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setStyle('color', '#039318');
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('Load ARC HOT - OK (Records: ' + this.bean.OU_QTYREG + ')');
                break;
            case this.PROCESS_ERROR:
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('Load ARC HOT - Error ID File');
                break;
        }
        Ext.getCmp(prototype.ControlLoadARC.id+'-btnAccept').show();
    }
});



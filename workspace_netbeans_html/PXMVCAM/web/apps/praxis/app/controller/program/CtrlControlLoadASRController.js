Ext.define('Ext.Praxis.controller.program.CtrlControlLoadASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlControlLoadASRController',
    bean: {},
    PROCESS_OK: 0,
    PROCESS_ERROR: 1,
    init: function(view) {
        prototype.ControlLoadASR = {
            id: 'CtrlControlLoadASRForm',
            url: CONTEXTPATH+'/CtrlControlLoadASR'
        };
    },
    startDisplay: function () {
        me.processLoadASRHOT(this.bean);
        Ext.getCmp(prototype.ControlLoadASR.id+'-btnAccept').hide();
        Ext.getCmp(prototype.ControlLoadASR.id+'-lblMsg').setText('');
    },
    btnAccept_clickHandler: function () {
        Ext.getCmp('CtrlControlLoadASRForm').hide();
    },
    displayMesagge: function (process) {
        switch(process){
            case this.PROCESS_OK:
                Ext.getCmp(prototype.ControlLoadASR.id+'-lblMsg').setStyle('color', '#039318');
                Ext.getCmp(prototype.ControlLoadASR.id+'-lblMsg').setText('Load ASR HOT - OK (Records: ' + this.bean.OU_QTYREG + ')');
                break;
            case this.PROCESS_ERROR:
                Ext.getCmp(prototype.ControlLoadASR.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlLoadASR.id+'-lblMsg').setText('Load ASR HOT - Error ID File');
                break;
        }
        Ext.getCmp(prototype.ControlLoadASR.id+'-btnAccept').show();
    },
});



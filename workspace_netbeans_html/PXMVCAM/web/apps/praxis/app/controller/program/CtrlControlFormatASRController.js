Ext.define('Ext.Praxis.controller.program.CtrlControlFormatASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlControlFormatASRController',
    bean: {},
    gloFilterFormatASRHOT: {},
    PROCESS_OK: 0,
    PROCESS_ERROR: 1,
    PROCESS_DUPLICADO: 2,
    gloProcess: '',
    init: function(view) {
        prototype.ControlFormatASR = {
            id: 'CtrlControlFormatASRForm',
            url: CONTEXTPATH+'/CtrlControlFormatASR'
        };
    },
    startDisplay: function () {
        this.gloProcess = -1;
        Ext.getCmp(prototype.ControlFormatASR.id+'-btnAccept').hide();
        Ext.getCmp(prototype.ControlFormatASR.id+'-btnProcess').show();
        Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setText('');
        Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').setValue('');
        Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').focus();
    },
    btnAccept_clickHandler: function () {
        Ext.getCmp('CtrlControlFormatASRForm').hide();
    },
    btnProcess_clickHandler: function () {
        if(Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').getValue().length > 0){
            this.bean.IN_NROID = Number(Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').getValue());
            if(this.bean.IN_NROID > 0){
                Ext.getCmp(prototype.ControlFormatASR.id+'-btnAccept').hide();
                Ext.getCmp(prototype.ControlFormatASR.id+'-btnProcess').hide();
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setText('');
                me.processFormatASRHOT(this.bean);
            }else{
                Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').focus();
                Ext.Msg.show({
                    title: Ext.getCmp('CtrlControlFormatASRForm').getTitle(),
                    msg: 'The File ID field must be greater than zero',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        }else{
            Ext.getCmp(prototype.ControlFormatASR.id+'-txtIDFile').focus();
            Ext.Msg.show({
                title: Ext.getCmp('CtrlControlFormatASRForm').getTitle(),
                msg: 'The File ID field is required',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
    },
    displayMesagge: function (process) {
        this.gloProcess = process;
        switch(process){
            case this.PROCESS_OK:
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setStyle('color', '#039318');
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setText('Format ASR HOT - OK');
                break;
            case this.PROCESS_ERROR:
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setText('Error Format - View Log');
                break;
            case this.PROCESS_DUPLICADO:
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlFormatASR.id+'-lblMsg').setText('Error Master-File previous processed');
                break;
        }
        Ext.getCmp(prototype.ControlFormatASR.id+'-btnAccept').show();
        Ext.getCmp(prototype.ControlFormatASR.id+'-btnProcess').hide();
    },
});



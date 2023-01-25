Ext.define('Ext.Praxis.controller.program.CtrlControlFormatARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlControlFormatARCController',
    bean: {},
    gloFilterFormatARCHOT: {},
    PROCESS_OK: 0,
    PROCESS_ERROR: 1,
    PROCESS_DUPLICADO: 2,
    gloProcess: '',
    init: function(view) {
        prototype.ControlFormatARC = {
            id: 'CtrlControlFormatARCForm',
            url: CONTEXTPATH+'/CtrlControlFormatARC'
        };
    },
    startDisplay: function () {
        this.gloProcess = -1;
        Ext.getCmp(prototype.ControlFormatARC.id+'-btnAccept').hide();
        Ext.getCmp(prototype.ControlFormatARC.id+'-btnProcess').show();
        Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setText('');
        Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').setValue('');
        Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').focus();
    },
    btnAccept_clickHandler: function () {
        Ext.getCmp('CtrlControlFormatARCForm').hide();
    },
    btnProcess_clickHandler: function () {
        if(Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').getValue().length > 0){
            this.bean.IN_NROID = Number(Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').getValue());
            if(this.bean.IN_NROID > 0){
                Ext.getCmp(prototype.ControlFormatARC.id+'-btnAccept').hide();
                Ext.getCmp(prototype.ControlFormatARC.id+'-btnProcess').hide();
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setText('');
                me.processFormatARCHOT(this.bean);
            }else{
                Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').focus();
                Ext.Msg.show({
                    title: Ext.getCmp('CtrlControlFormatARCForm').getTitle(),
                    msg: 'The File ID field must be greater than zero',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        }else{
            Ext.getCmp(prototype.ControlFormatARC.id+'-txtIDFile').focus();
            Ext.Msg.show({
                title: Ext.getCmp('CtrlControlFormatARCForm').getTitle(),
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
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setStyle('color', '#039318');
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setText('Format ARC HOT - OK');
                break;
            case this.PROCESS_ERROR:
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setText('Error Format - View Log');
                break;
            case this.PROCESS_DUPLICADO:
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlFormatARC.id+'-lblMsg').setText('Error Master-File previous processed');
                break;
        }
        Ext.getCmp(prototype.ControlFormatARC.id+'-btnAccept').show();
        Ext.getCmp(prototype.ControlFormatARC.id+'-btnProcess').hide();
    },
});



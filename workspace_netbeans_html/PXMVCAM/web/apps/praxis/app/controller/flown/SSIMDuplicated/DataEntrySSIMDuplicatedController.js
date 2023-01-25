/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMDuplicatedController                          *                          
 * Created on : 19/02/2018, 09:49:15                              *               
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.controller.flown.SSIMDuplicated.DataEntrySSIMDuplicatedController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySSIMDuplicatedController',
    searchParams: {},
    beanTMP: {},
    p: {},

    init: function(view){
        var me = this;
        
    },
    onQtyCouponsClick: function() {
        var option = Ext.getCmp(prototype.id01 + '-txtA1691-DESCRIP');
        if (option.isVisible()) {
            option.setVisible(false);
            Ext.getCmp(prototype.id01 + '-txtA1691-DESCRIP-label').setVisible(false);
        } else {
            option.setVisible(true);
            Ext.getCmp(prototype.id01 + '-txtA1691-DESCRIP-label').setVisible(true);
        }
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id01+'-btn-save').hide();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
                Ext.getCmp(prototype.id01+'-btn-cancel').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    onPrevClick: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            rec = all.getAt(rowIndex - 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex - 1};
            this.getDataInputs(rec);
        }
    },
    onNextClick: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};
            this.getDataInputs(rec);
        }
    },
    getDataInputs: function(rec){
        var DFLIGHT = rec.get('DFLIGHT');
        var NFLIGHT = rec.get('NFLIGHT');
        var CDEPART = rec.get('CDEPART');
        var CARRIVA = rec.get('CARRIVA');
        
        Ext.Ajax.request({
            url: prototype.url + '/completeData',
            method: 'POST',
            timeout: 60000000,
            waitTitle: 'Processing',
            waitMsg: 'Response time...',
            params: {
                DFLIGHT: DFLIGHT,
                NFLIGHT: NFLIGHT,
                CDEPART: CDEPART,
                CARRIVA: CARRIVA
            },
            success: function(response, options) {
                var resp = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.id01+'-txtA1691-DFLIGHT').setValue(resp.beanCons.DFLIGHT);
                Ext.getCmp(prototype.id01+'-txtA1691-NFLIGHT').setValue(resp.beanCons.NFLIGHT);
                Ext.getCmp(prototype.id01+'-cmbA1691-STVAL').setValue(resp.beanCons.STVAL);
                Ext.getCmp(prototype.id01+'-txtA1691-CDEPART').setValue(resp.beanCons.CDEPART);
                Ext.getCmp(prototype.id01+'-txtA1691-CARRIVA').setValue(resp.beanCons.CARRIVA);
                Ext.getCmp(prototype.id01+'-txtA1691-ZONE').setValue(resp.beanCons.ZONE);
                Ext.getCmp(prototype.id01+'-txtA1691-CARRI').setValue(resp.beanCons.CARRI);
                Ext.getCmp(prototype.id01+'-txtA1691-LEGSEQ').setValue(resp.beanCons.LEGSEQ);
                Ext.getCmp(prototype.id01+'-txtA1691-FSENDSS').setValue(resp.beanCons.FSENDSS);
                Ext.getCmp(prototype.id01+'-cmbA1691-FSTASS').setValue(resp.beanCons.FSTASS);
                Ext.getCmp(prototype.id01+'-cmbA1691-FFLOW').setValue(resp.beanCons.FFLOW);
                Ext.getCmp(prototype.id01+'-txtA1691-NPLANE').setValue(resp.beanCons.NPLANE);
                Ext.getCmp(prototype.id01+'-cmbA1691-TOPER').setValue(resp.beanCons.TOPER);
                Ext.getCmp(prototype.id01+'-txtA1691-DESCRIP').setValue(resp.beanCons.strDescripcion);
                Ext.getCmp(prototype.id01+'-txtA1691-FSENDOD').setValue(resp.beanCons.FSENDOD);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNOD').setValue(resp.beanCons.QCPNOD);
                Ext.getCmp(prototype.id01+'-cmbA1691-FSTAOD').setValue(resp.beanCons.FSTAOD);
                Ext.getCmp(prototype.id01+'-txtA1691-FOPERZUL').setValue(resp.beanCons.FOPERZUL);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPTRA').setValue(resp.beanCons.QCPTRA);
                Ext.getCmp(prototype.id01+'-txtA1691-FSENDVC').setValue(resp.beanCons.FSENDVC);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNVC').setValue(resp.beanCons.QCPNVC);
                Ext.getCmp(prototype.id01+'-cmbA1691-FSTAVC').setValue(resp.beanCons.FSTAVC);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNOCR').setValue(resp.beanCons.QCPNOCR);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNMA').setValue(resp.beanCons.QCPNMA);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNTOT').setValue(resp.beanCons.QCPNTOT);

                Ext.getCmp(prototype.id01+'-txtA1691-FCLOSE').setValue(resp.beanCons.FCLOSE);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNVAL').setValue(resp.beanCons.QCPNVAL);
                Ext.getCmp(prototype.id01+'-cmbA1691-FSTAPO').setValue(resp.beanCons.FSTAPO);
                Ext.getCmp(prototype.id01+'-txtA1691-FSENDFI').setValue(resp.beanCons.FSENDFI);
                Ext.getCmp(prototype.id01+'-txtA1691-QCPNFI').setValue(resp.beanCons.QCPNFI);
                Ext.getCmp(prototype.id01+'-cmbA1691-FSTAFI').setValue(resp.beanCons.FSTAFI);

                Ext.getCmp(prototype.id01+'-txt-USCR').setValue(resp.beanCons.USCR);
                Ext.getCmp(prototype.id01+'-txt-FECR').setValue(resp.beanCons.FECR);
                Ext.getCmp(prototype.id01+'-txt-HOCR').setValue(resp.beanCons.HOCR);
                Ext.getCmp(prototype.id01+'-txt-USUP').setValue(resp.beanCons.USUP);
                Ext.getCmp(prototype.id01+'-txt-FEUP').setValue(resp.beanCons.FEUP);
                Ext.getCmp(prototype.id01+'-txt-HOUP').setValue(resp.beanCons.HOUP);

                if (resp.beanCons.FSTAVC === "1") Ext.getCmp(prototype.id01+'-cmbA1691-FSTAVC').disable(true);
                else Ext.getCmp(prototype.id01+'-cmbA1691-FSTAVC').enable(true);

                if (resp.beanCons.FSTASS === "1") Ext.getCmp(prototype.id01+'-cmbA1691-FSTASS').disable(true);
                else Ext.getCmp(prototype.id01+'-cmbA1691-FSTASS').enable(true);

                if (resp.beanCons.FSTAPO === '3') {
                    Ext.getCmp(prototype.id01+'-btn-save').hide();
                    Ext.getCmp(prototype.id01+'-btn-update').hide();
                    Ext.getCmp(prototype.id01+'-btn-delete').hide();
                    Ext.getCmp(prototype.id01+'-btn-cancel').show();
                } else {
                    Ext.getCmp(prototype.id01+'-btn-save').hide();
                    Ext.getCmp(prototype.id01+'-btn-update').show();
                    Ext.getCmp(prototype.id01+'-btn-delete').show();
                    Ext.getCmp(prototype.id01+'-btn-cancel').show();
                }
            },
            failure: function (form, action) {
                if (action.failureType === 'server') {
                    obj = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('Server Error!', obj.msg);
                } else {
                    Ext.Msg.alert('Warning!', action.response.responseText);
                }
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'yes'){
                    this.view.params.action = "U";
                    this.save();
                }
            }
        });
    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.save();
                }
            }
        });
    },
    save: function(action){
//        var p = this.view.params;
//
        var strOption = action;
        
        var STVAL = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-STVAL').getValue());
        var CARRI = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-CARRI').getValue());
        var FFLOW = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FFLOW').getValue());
        var TOPER = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-TOPER').getValue());
        var FSENDSS = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-FSENDSS').getValue());
        var CDEPART = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-CDEPART').getValue());
        var CARRIVA = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-CARRIVA').getValue());
        var ZONE = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-ZONE').getValue());
//        var MINICONEC = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-MINICONEC').getValue());
        var LEGSEQ = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-LEGSEQ').getValue());
        var NFLIGHT = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-NFLIGHT').getValue());
        var DFLIGHT = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-DFLIGHT').getValue());
        var NPLANE = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-NPLANE').getValue());
        var FSTASS = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FSTASS').getValue());
        var FSENDOD = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-FSENDOD').getValue());
        var QCPNOD = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPNOD').getValue());
        var FSTAOD = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FSTAOD').getValue());
        var FSENDVC = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-FSENDVC').getValue());
        var FSTAVC = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FSTAVC').getValue());
        var QCPNVC = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPNVC').getValue());
        var QCPNMA = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPNMA').getValue());
        var QCPNTOT = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPNTOT').getValue());
//        var QCPNOAL = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-QCPNOAL').getValue());
//        var QCPHARB = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-QCPHARB').getValue());
        var FSENDFI = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-FSENDFI').getValue());
        var QCPNFI = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPNFI').getValue());
        var FSTAFI = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FSTAFI').getValue());
        var FSTAPO = Ext.String.trim(Ext.getCmp(prototype.id01+'-cmbA1691-FSTAPO').getValue());
        var FOPERZUL = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-FOPERZUL').getValue());
        var QCPTRA = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-QCPTRA').getValue());
        var strDescripcion = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1691-DESCRIP').getValue());
        
        Ext.Ajax.request({
            url: prototype.url + '/mantenimientoA1691',
            method: 'POST',
            timeout: 60000000,
            params:{
                strOption: strOption,
                STVAL: STVAL,
                CARRI: CARRI,
                FFLOW: FFLOW,
                TOPER: TOPER,
                FSENDSS: FSENDSS,
                CDEPART: CDEPART,
                CARRIVA: CARRIVA,
                ZONE: ZONE,
//                MINICONEC: MINICONEC,
                LEGSEQ: LEGSEQ,
                NFLIGHT: NFLIGHT,
                DFLIGHT: DFLIGHT,
                NPLANE: NPLANE,
                FSTASS: FSTASS,
                FSENDOD: FSENDOD,
                QCPNOD: QCPNOD,
                FSTAOD: FSTAOD,
                FSENDVC: FSENDVC,
                FSTAVC: FSTAVC,
                QCPNVC: QCPNVC,
                QCPNMA: QCPNMA,
                QCPNTOT: QCPNTOT,
//                QCPNOAL: QCPNOAL,
//                QCPHARB: QCPHARB,
                FSENDFI: FSENDFI,
                QCPNFI: QCPNFI,
                FSTAFI: FSTAFI,
                FSTAPO: FSTAPO,
                FOPERZUL: FOPERZUL,
                QCPTRA: QCPTRA,
                strDescripcion: strDescripcion
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if(res.mensaje==="An Unexpected Error Ocurred(NF)."){
                    global.Msg({
                        msg: res.mensaje,
                        icon: 0,
                        fn:function(){//fail
                        }
                    });
                }else if(res.mensaje==="Operation was successful."){
                    global.Msg({
                        msg: res.mensaje,
                        icon:1,
                        fn:function(){
//                            Ext.getCmp(prototype.id01 + '-btn-cancel').fireEvent('click',{});
//                            Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
                        }
                    });
                }
                Ext.getCmp(prototype.id01 + '-btn-cancel').fireEvent('click',{});
                Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
            },
            failure: function (form, action) {
                if (action.failureType === 'server') {
                    obj = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('Server Error!', obj.msg);
                } else {
                    Ext.Msg.alert('Warning!', action.response.responseText);
                }
            }
        });
    }
    
});
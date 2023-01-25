/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.AccountingMasterFlown.DataEntryAccountingMasterFlownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterFlown',
    IN_A1740TITRA_OLD: null,
    IN_A1740TIPO_OLD: null,
    IN_A1740SUBTI_OLD: '',
    IN_A1740CATEG_OLD: null,
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
        
        
        
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        this.setStoreCombos("1");
        this.setStoreCombos("2");
        this.setStoreCombos("3");       
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-cmbDocumentTypeDataEntry').select("");
                Ext.getCmp(prototype.id + '-cmbCtaTypeDataEntry').select("");
                Ext.getCmp(prototype.id + '-cmbCategoryDataEntry').select("");
                Ext.getCmp(prototype.id + '-cmbINTNU').setValue("");
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();

                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreCombos: function(tipo) {
        var combo, value;
        switch(tipo) {
            case '1':
                combo = "cmbDocumentTypeDataEntry";
                value = "loadDocumentType"; break;
            case '2':
                combo = "cmbCtaTypeDataEntry";
                value = "loadAccountType"; break;
            case '3':
                combo = "cmbCategoryDataEntry";
                value = "loadCategory"; break;
        }
        Ext.Ajax.request({
            url: prototype.url + '/' + value,
            method: 'POST',
            timeout: 60000000,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                
                var lst = new Array();
                lst.push(['', 'Select']);
                switch(tipo) {
                    case '1':
                        for(var k = 0; k< data.length; k++)
                            lst.push([data[k].A1740TITRA, data[k].A1740TITRA]);
                        break;
                    case '2':
                        for(var k = 0; k< data.length; k++)
                            lst.push([data[k].A1740TIPO, data[k].A1740TIPODESC]);
                        break;
                    case '3':
                        for(var k = 0; k< data.length; k++)
                            lst.push([data[k].A1740CATEG, data[k].A1740CATEG]);
                        break;
                }
                var storeComboBox = Ext.create('Ext.data.SimpleStore', {
                    storeId: 'data',
                    autoLoad: false,
                    data: lst,
                    fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-' + combo).bindStore(storeComboBox);
            }
        });
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "U";
                    this.crud();
                }
            }
        });
    }
    ,
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
                    this.crud();
                }
            }
        });
    }
    ,
    onSaveClick: function(btn) {
        var p = this.view.params;
        var cmb1 = Ext.getCmp(prototype.id + '-cmbDocumentTypeDataEntry').getValue();
        var cmb2 = Ext.getCmp(prototype.id + '-cmbCtaTypeDataEntry').getValue();
        var cmb3 = Ext.getCmp(prototype.id + '-cmbCategoryDataEntry').getValue();
        var txt = Ext.getCmp(prototype.id + '-txtA1740SUBTI').getValue();
        var cmbINTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();

        if (cmbINTNU ==="" || cmb1 === "" || cmb2 === "" || cmb3 === "" || txt === "") {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else { 
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    }
    ,
    onCmbDocumentTypeChange: function( obj , newValue , oldValue , eOpts){
        IN_A1740TITRA_OLD = oldValue;
    },
    onCmbCtaTypeChange: function( obj , newValue , oldValue , eOpts){
        IN_A1740TIPO_OLD = oldValue;
    },
    onCmbCategoryChange: function( obj , newValue , oldValue , eOpts){
        IN_A1740CATEG_OLD = oldValue;
    },
    crud: function() {
        var p = this.view.params;
        var rec = p.rec;

        var strOption = p.action;
        
        console.log(this.getDataEntryValues(strOption));
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                console.log("msg: " + msg);
                if(msg==='RECORD INSERTED' || msg==='RECORD UPDATED' || msg==='RECORD REMOVED'){
                    global.Msg({
                        msg: msg,
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close(),
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({
                        msg: msg,
                        icon: 2,
                        fn: function() {}
                    });
                }
                
            }
        });
    },
    getDataEntryValues: function(strOption) {
        if (strOption === 'U' || strOption === 'D') {
            var p = this.view.params;
            rec = p.rec;
            /* IN_A1740SUBTI_OLD = rec.get('A1740SUBTI');            
            IN_A1740TITRA_OLD = rec.get('A1740TITRA');
            IN_A1740TIPO_OLD = rec.get('A1740TIPO');
            IN_A1740CATEG_OLD = rec.get('A1740CATEG');*/
            
            IN_A1740TITRA_OLD = Ext.getCmp(prototype.id + '-lblA1740TITRA').getValue();
            IN_A1740TIPO_OLD = Ext.getCmp(prototype.id + '-lblA1740TIPO').getValue();
            IN_A1740SUBTI_OLD = Ext.getCmp(prototype.id + '-lblA1740SUBTI').getValue();
            IN_A1740CATEG_OLD = Ext.getCmp(prototype.id + '-lblA1740CATEG').getValue();
        } 
        else 
        {
            IN_A1740SUBTI_OLD = "";            
            IN_A1740TITRA_OLD = "";
            IN_A1740TIPO_OLD = "";
            IN_A1740CATEG_OLD = "";
        }
        
        var A1740TITRA = Ext.getCmp(prototype.id + '-cmbDocumentTypeDataEntry').getValue();
        var A1740TIPO = Ext.getCmp(prototype.id + '-cmbCtaTypeDataEntry').getValue();
        var A1740SUBTI = Ext.getCmp(prototype.id + '-txtA1740SUBTI').getValue();
        var A1740CATEG = Ext.getCmp(prototype.id + '-cmbCategoryDataEntry').getValue();
        var A1740INTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        
        var A1740CIA = Ext.getCmp(prototype.id + '-txtA1740CIA').getValue();
        var A1740UNIDA = Ext.getCmp(prototype.id + '-txtA1740UNIDA').getValue();
        var A1740CECOS = Ext.getCmp(prototype.id + '-txtA1740CECOS').getValue();
        var A1740UBICA = Ext.getCmp(prototype.id + '-txtA1740UBICA').getValue();
        var A1740CTA = Ext.getCmp(prototype.id + '-txtA1740CTA').getValue();
        var A1740SCTA = Ext.getCmp(prototype.id + '-txtA1740SCTA').getValue();
        var A1740EQUI = Ext.getCmp(prototype.id + '-txtA1740EQUI').getValue();
        var A1740ICIA = Ext.getCmp(prototype.id + '-txtA1740ICIA').getValue();
        
        var A1740CLIE = Ext.getCmp(prototype.id + '-txtA1740CLIE').getValue();
        
        var A1740FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1740FINI').getValue(), 'Ymd');
        var A1740FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1740FFIN').getValue(), 'Ymd');
        
        
        if (IN_A1740SUBTI_OLD === null) IN_A1740SUBTI_OLD = "";
        if (IN_A1740TITRA_OLD === null) IN_A1740TITRA_OLD = "";
        if (IN_A1740TIPO_OLD === null) IN_A1740TIPO_OLD = "";
        if (IN_A1740CATEG_OLD === null) IN_A1740CATEG_OLD = "";
        
        return {
            strOption: strOption,
            A1740TITRA: A1740TITRA,
            A1740TIPO: A1740TIPO,
            A1740SUBTI: A1740SUBTI,
            A1740CATEG: A1740CATEG,
            A1740CIA: A1740CIA,
            A1740INTNU: A1740INTNU,
            A1740UNIDA: A1740UNIDA,
            A1740CECOS: A1740CECOS,
            A1740UBICA: A1740UBICA,
            A1740CTA: A1740CTA,
            A1740SCTA: A1740SCTA,
            A1740EQUI: A1740EQUI,
            A1740ICIA: A1740ICIA,
            A1740CLIE: A1740CLIE,
            A1740FINI: A1740FINI,
            A1740FFIN: A1740FFIN,
            IN_A1740TITRA_OLD: IN_A1740TITRA_OLD,
            IN_A1740TIPO_OLD: IN_A1740TIPO_OLD,
            IN_A1740SUBTI_OLD: IN_A1740SUBTI_OLD,
            IN_A1740CATEG_OLD: IN_A1740CATEG_OLD
        };
    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp(prototype.id + '-cmbDocumentTypeDataEntry').setValue(rec.get('A1740TITRA'));
        Ext.getCmp(prototype.id + '-cmbCtaTypeDataEntry').setValue(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-txtA1740SUBTI').setValue(rec.get('A1740SUBTI'));
        Ext.getCmp(prototype.id + '-cmbCategoryDataEntry').setValue(rec.get('A1740CATEG'));
        Ext.getCmp(prototype.id + '-cmbINTNU').setValue(rec.get('A1740INTNU')=== 'YES' ? 'Y' : 'N');
        
        Ext.getCmp(prototype.id + '-txtA1740CIA').setValue(rec.get('A1740CIA'));
        Ext.getCmp(prototype.id + '-txtA1740UNIDA').setValue(rec.get('A1740UNIDA'));
        Ext.getCmp(prototype.id + '-txtA1740CECOS').setValue(rec.get('A1740CECOS'));
        Ext.getCmp(prototype.id + '-txtA1740UBICA').setValue(rec.get('A1740UBICA'));
        Ext.getCmp(prototype.id + '-txtA1740CTA').setValue(rec.get('A1740CTA'));
        Ext.getCmp(prototype.id + '-txtA1740SCTA').setValue(rec.get('A1740SCTA'));
        Ext.getCmp(prototype.id + '-txtA1740EQUI').setValue(rec.get('A1740EQUI'));
        Ext.getCmp(prototype.id + '-txtA1740ICIA').setValue(rec.get('A1740ICIA'));

        Ext.getCmp(prototype.id + '-txtA1740CLIE').setValue(rec.get('A1740CLIE'));
        Ext.getCmp(prototype.id + '-txtA1740FINI').setValue(rec.get('A1740FINI'));
        Ext.getCmp(prototype.id + '-txtA1740FFIN').setValue(rec.get('A1740FFIN'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1740REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1740FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1740HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1740REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1740FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1740HREVI'));
        
        Ext.getCmp(prototype.id + '-lblA1740TITRA').setValue(rec.get('A1740TITRA'));
        Ext.getCmp(prototype.id + '-lblA1740TIPO').setValue(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-lblA1740SUBTI').setValue(rec.get('A1740SUBTI'));
        Ext.getCmp(prototype.id + '-lblA1740CATEG').setValue(rec.get('A1740CATEG'));
        
    }

});



Ext.define('Ext.Praxis.controller.sales.MasterBundles.DataEntryMasterBundlesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMasterBundlesController',
    searchParams: {},
    nRowUpd: -1,
//    ANCILLARIES: {},
//    lstAncillaries: {},
    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtTipoEmd').focus();
                break;
        }
    },
    getDataInputs: function(rec) {
        Ext.getCmp(prototype.id + '-txtTipoEmd').setValue(rec.get('A2534TEMD'));
        Ext.getCmp(prototype.id + '-txtRFICBundle').setValue(rec.get('A2534BRFIC'));
        Ext.getCmp(prototype.id + '-txtRFISBundle').setValue(rec.get('A2534BRFIS'));
        Ext.getCmp(prototype.id + '-txtDescription').setValue(rec.get('A2534DESCR'));
        Ext.getCmp(prototype.id + '-txtA2534FIVIG').setValue(rec.get('A2534VDESD'));
        Ext.getCmp(prototype.id + '-txtA2534FFVIG').setValue(rec.get('A2534VHAST'));
        Ext.getCmp(prototype.id + '-txtCostoBundle').setValue(rec.get('A2534TOTBD'));
        Ext.getCmp(prototype.id + '-txtTaxPorc').setValue(rec.get('A2534IMPTB'));
        Ext.getCmp(prototype.id + '-txtTaxAmount').setValue(rec.get('A2534IMPMB'));
        Ext.getCmp(prototype.id + '-txtNeto').setValue(rec.get('A2534NETOB'));
        
        Ext.getCmp(prototype.id + '-txtRFICAnc').setValue(rec.get('A2534ARFIC'));
        Ext.getCmp(prototype.id + '-txtRFISAnc').setValue(rec.get('A2534ARFIS'));
        Ext.getCmp(prototype.id + '-txtDescripAnc').setValue(rec.get('A2534DESCA'));
        Ext.getCmp(prototype.id + '-txtMdaAnc').setValue(rec.get('A2534MDABD'));
        Ext.getCmp(prototype.id + '-txtTotAnc').setValue(rec.get('A2534TOTAN'));
        Ext.getCmp(prototype.id + '-txtTaxPorAnc').setValue(rec.get('A2534IMPTA'));
        Ext.getCmp(prototype.id + '-txtTaxAmountAnc').setValue(rec.get('A2534IMPMA'));
        Ext.getCmp(prototype.id + '-txtNetoAnc').setValue(rec.get('A2534NETOA'));
        Ext.getCmp(prototype.id + '-txtFarePor').setValue(rec.get('A2534PORCA'));
        
        this.setGrilla();
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A2534REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A2534FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A2534HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A2534REVIS'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A2534FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A2534HREVI'));
    },
    setFormatParameter: function() {
        var txtRFISBundle = Ext.getCmp(prototype.id + '-txtRFISBundle').getValue();
        var txtRFICBundle = Ext.getCmp(prototype.id + '-txtRFICBundle').getValue();
        
        searchParams = {
            IN_TFILTER: "4",
            IN_BUNDL: txtRFISBundle,
            IN_RFIC: txtRFICBundle,
            IN_SUBCD: ""
        };
    },
    setGrilla: function() {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.MasterBundles.GridDataEntry', {
            proxy: {
                url: prototype.url + '/searchAncillaries'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridAnc').bindStore(storeGridDatas);
    },
    onAddAncillarieClick: function() {
        var store = Ext.getCmp(prototype.id + '-gridAnc').getStore();
        
        var fila = store.data.length;
        var txtRFICAnc = Ext.getCmp(prototype.id + '-txtRFICAnc').getValue();
        var txtRFISAnc = Ext.getCmp(prototype.id + '-txtRFISAnc').getValue();
        var txtDescripAnc = Ext.getCmp(prototype.id + '-txtDescripAnc').getValue();
        var txtMdaAnc = Ext.getCmp(prototype.id + '-txtMdaAnc').getValue();
        var txtTotAnc = Ext.getCmp(prototype.id + '-txtTotAnc').getValue();
        var txtTaxPorAnc = Ext.getCmp(prototype.id + '-txtTaxPorAnc').getValue();
        var txtTaxAmountAnc = Ext.getCmp(prototype.id + '-txtTaxAmountAnc').getValue();
        var txtNetoAnc = Ext.getCmp(prototype.id + '-txtNetoAnc').getValue();
        var txtFarePor = Ext.getCmp(prototype.id + '-txtFarePor').getValue();
        
        store.insert(fila, {
            A2534ARFIC: txtRFICAnc,
            A2534ARFIS: txtRFISAnc,
            A2534DESCA: txtDescripAnc,
            A2534MDABD: txtMdaAnc,
            A2534TOTAN: txtTotAnc,
            A2534IMPTA: txtTaxPorAnc,
            A2534IMPMA: txtTaxAmountAnc,
            A2534NETOA: txtNetoAnc,
            A2534PORCA: txtFarePor
        });
    },
    onUpdateAncillarieClick: function() {
        var store = Ext.getCmp(prototype.id + '-gridAnc').getStore();
        
        var txtRFICAnc = Ext.getCmp(prototype.id + '-txtRFICAnc').getValue();
        var txtRFISAnc = Ext.getCmp(prototype.id + '-txtRFISAnc').getValue();
        var txtDescripAnc = Ext.getCmp(prototype.id + '-txtDescripAnc').getValue();
        var txtMdaAnc = Ext.getCmp(prototype.id + '-txtMdaAnc').getValue();
        var txtTotAnc = Ext.getCmp(prototype.id + '-txtTotAnc').getValue();
        var txtTaxPorAnc = Ext.getCmp(prototype.id + '-txtTaxPorAnc').getValue();
        var txtTaxAmountAnc = Ext.getCmp(prototype.id + '-txtTaxAmountAnc').getValue();
        var txtNetoAnc = Ext.getCmp(prototype.id + '-txtNetoAnc').getValue();
        var txtFarePor = Ext.getCmp(prototype.id + '-txtFarePor').getValue();

        var rec = store.getAt(this.nRowUpd);
        store.remove(rec);

        store.insert(this.nRowUpd, {
            A2534ARFIC: txtRFICAnc,
            A2534ARFIS: txtRFISAnc,
            A2534DESCA: txtDescripAnc,
            A2534MDABD: txtMdaAnc,
            A2534TOTAN: txtTotAnc,
            A2534IMPTA: txtTaxPorAnc,
            A2534IMPMA: txtTaxAmountAnc,
            A2534NETOA: txtNetoAnc,
            A2534PORCA: txtFarePor
        });
    },
    onCancelAncillarieClick: function() {
        Ext.getCmp(prototype.id+'-btnAddAncillarie').show();
        Ext.getCmp(prototype.id+'-btnUpdateAncillarie').hide();
        Ext.getCmp(prototype.id+'-btnCancelAncillarie').hide();
    },
    onEditClick: function(obj, nRow, nColumn) {
        this.nRowUpd = nRow;
        var data = obj.dataSource.data.items[nRow].data;
        Ext.getCmp(prototype.id + '-txtRFICAnc').setValue(data.A2534ARFIC);
        Ext.getCmp(prototype.id + '-txtRFISAnc').setValue(data.A2534ARFIS);
        Ext.getCmp(prototype.id + '-txtDescripAnc').setValue(data.A2534DESCA);
        Ext.getCmp(prototype.id + '-txtMdaAnc').setValue(data.A2534MDABD);
        Ext.getCmp(prototype.id + '-txtTotAnc').setValue(data.A2534TOTAN);
        Ext.getCmp(prototype.id + '-txtTaxPorAnc').setValue(data.A2534IMPTA);
        Ext.getCmp(prototype.id + '-txtTaxAmountAnc').setValue(data.A2534IMPMA);
        Ext.getCmp(prototype.id + '-txtNetoAnc').setValue(data.A2534NETOA);
        Ext.getCmp(prototype.id + '-txtFarePor').setValue(data.A2534PORCA);
        
        Ext.getCmp(prototype.id+'-btnAddAncillarie').hide();
        Ext.getCmp(prototype.id+'-btnUpdateAncillarie').show();
        Ext.getCmp(prototype.id+'-btnCancelAncillarie').show();
    },
    onRemoveClick: function(obj, nRow, nColumn) {
        var store = Ext.getCmp(prototype.id + '-gridAnc').getStore();
        var rec = obj.store.getAt(nRow);
        store.remove(rec);
        if (store.data.length === 0) this.onCancelAncillarieClick();
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onTaxPorcKeypress: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            var txtTaxPorc = Ext.getCmp(prototype.id+'-txtTaxPorc').getValue();
            if (txtTaxPorc === "") {
                global.Msg({
                    msg: 'Enter The Tax %'
                });
            } else {
                var txtTaxPorc = Ext.getCmp(prototype.id+'-txtTaxPorc').getValue();
                txtTaxPorc = txtTaxPorc === null || txtTaxPorc === undefined ? 0 : txtTaxPorc;
                var txtCostoBundle = Ext.getCmp(prototype.id+'-txtCostoBundle').getValue();
                txtCostoBundle = txtCostoBundle === null || txtCostoBundle === undefined ? 0 : txtCostoBundle;
                var txtTaxAmount = Ext.getCmp(prototype.id+'-txtTaxAmount').getValue();
                txtTaxAmount = txtTaxAmount === null || txtTaxAmount === undefined ? 0 : txtTaxAmount;
                
                var calculo = ((parseFloat(txtTaxPorc)*parseFloat(txtCostoBundle))/100).toFixed(2);
                Ext.getCmp(prototype.id+'-txtTaxAmount').setValue(calculo);
                
                var calculo2 = (parseFloat(txtTaxAmount) + parseFloat(txtCostoBundle));
                Ext.getCmp(prototype.id+'-txtNeto').setValue(calculo2.toFixed(2));
            }
        }
    },
    onTaxPorAncKeypress: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            var txtTaxPorAnc = Ext.getCmp(prototype.id+'-txtTaxPorAnc').getValue();
            if (txtTaxPorAnc === "") {
                global.Msg({
                    msg: 'Enter The Tax %'
                });
            } else {
                var txtTaxPorAnc = Ext.getCmp(prototype.id+'-txtTaxPorAnc').getValue();
                txtTaxPorAnc = txtTaxPorAnc === null || txtTaxPorAnc === undefined ? 0 : txtTaxPorAnc;
                var txtTotAnc = Ext.getCmp(prototype.id+'-txtTotAnc').getValue();
                txtTotAnc = txtTotAnc === null || txtTotAnc === undefined ? 0 : txtTotAnc;
                var txtTaxAmountAnc = Ext.getCmp(prototype.id+'-txtTaxAmountAnc').getValue();
                txtTaxAmountAnc = txtTaxAmountAnc === null || txtTaxAmountAnc === undefined ? 0 : txtTaxAmountAnc;
                
                var calculo3 = ((parseFloat(txtTaxPorAnc)*parseFloat(txtTotAnc))/100).toFixed(2);
                Ext.getCmp(prototype.id+'-txtTaxAmountAnc').setValue(calculo3);
                
                var calculo4 = (parseFloat(txtTaxAmountAnc) + parseFloat(txtTotAnc));
                Ext.getCmp(prototype.id+'-txtNetoAnc').setValue(calculo4.toFixed(2));
            }
        }
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
//        var CAMPO = Ext.getCmp(prototype.id + '-').getValue();
//
//        if (CAMPO === "") {
//            global.Msg({
//                msg: 'You must enter all required fields.',
//                fn: function() {}
//            });
//        } else { 
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
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
//        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        console.log(this.getDataEntryValues());
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'yes'){
                    this.view.params.action = "U";
                    this.crud();
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
                    this.crud();
                }
            }
        });
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/setSQP00826',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.MESSAGE;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryMasterBundlesForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var txtRFICBundle = Ext.getCmp(prototype.id + '-txtRFICBundle').getValue();
        var txtRFISBundle = Ext.getCmp(prototype.id + '-txtRFISBundle').getValue();
        var txtDescription = Ext.getCmp(prototype.id + '-txtDescription').getValue();
        var txtTipoEmd = Ext.getCmp(prototype.id + '-txtTipoEmd').getValue();
        var txtA2534FIVIG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA2534FIVIG').getValue(), 'Ymd');
        var txtA2534FFVIG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA2534FFVIG').getValue(), 'Ymd');
        var txtMdaAnc = Ext.getCmp(prototype.id + '-txtMdaAnc').getValue();
        var txtCostoBundle = Ext.getCmp(prototype.id + '-txtCostoBundle').getValue();
        var txtTaxPorc = Ext.getCmp(prototype.id + '-txtTaxPorc').getValue();
        var txtTaxAmount = Ext.getCmp(prototype.id + '-txtTaxAmount').getValue();
        var txtNeto = Ext.getCmp(prototype.id + '-txtNeto').getValue();
        
        var store = Ext.getCmp(prototype.id + '-gridAnc').getStore();
        var recs = [];
        store.each(
            function(rec){
                recs.push(rec.data);
            }
        );
        var ANCILLARIES = Ext.encode(recs);
        
        return {
            strOption: strOption,
            A2534BRFIC: txtRFICBundle,
            A2534BRFIS: txtRFISBundle,
            A2534DESCR: txtDescription,
            A2534TEMD: txtTipoEmd,
            A2534VDESD: txtA2534FIVIG,
            A2534VHAST: txtA2534FFVIG,
            A2534MDABD: txtMdaAnc,
            A2534TOTBD: txtCostoBundle,
            A2534IMPTB: txtTaxPorc,
            A2534IMPMB: txtTaxAmount,
            A2534NETOB: txtNeto,
            A2534DIFBD: 0.0,
            listaAncillaries: ANCILLARIES
        };
    }
});
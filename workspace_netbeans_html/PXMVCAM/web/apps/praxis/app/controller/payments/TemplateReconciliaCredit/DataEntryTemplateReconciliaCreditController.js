Ext.define('Ext.Praxis.controller.payments.TemplateReconciliaCredit.DataEntryTemplateReconciliaCreditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTemplateReconciliaCreditController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'TemplateReconciliaCreditForm';
        prototype.url = CONTEXTPATH + '/TemplateReconciliaCredit';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function () {
//        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                this.DeshabilitarCampoCreacion();
                this.getData();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    trimValue: function (value) {
        if (value === null || value === undefined) {
            return '';
        }

        if (value === '') {
            return '';
        }

        let strValue;
        if (typeof value === 'string') {
            strValue = value;
        } else {
            strValue = String(value);
        }

        const trimmed = strValue.trim();
        return trimmed === '' ? '' : trimmed;
    },
    mostrarData: function () {
        
        console.log(this.bean.data,'USUUUUUGAAA')

        // DETAIL (DATA ENTRY – CAMPOS DEL GRID)
        this.setValue('de-txtRN', this.bean.data.RN);
        this.setValue('de-txtCCUST2', this.trimValue(this.bean.data.CCUST)); // segundo CCUST (form de detalle)
        this.setValue('de-txtPRDA', this.trimValue(this.bean.data.PRDA));
        this.setValue('de-txtCODPRO', this.trimValue(this.bean.data.CODPRO));
        this.setValue('de-txtCCUSTPRO', this.trimValue(this.bean.data.CCUSTPRO));
        this.setValue('de-txtFLIQUIDACI', this.trimValue(this.bean.data.FLIQUIDACI));
        this.setValue('de-txtLIQUIDACIO', this.trimValue(this.bean.data.LIQUIDACIO));
        this.setValue('de-txtMERCHAND', this.trimValue(this.bean.data.MERCHAND));
        this.setValue('de-txtCODIGO', this.trimValue(this.bean.data.CODIGO));
        this.setValue('de-txtCORRL', this.trimValue(this.bean.data.CORRL));

        // AMOUNT
        this.setValue('de-txtMONEDA', this.bean.data.MONEDA);
        this.setValue('de-txtMONEDAPAGO', this.bean.data.MONEDAPAGO);

        let importe = this.bean.data.IMPORTECeba;
        if (importe !== null && importe !== undefined) {
            this.setValue('de-txtIMPORTE', importe);
        }

        let importePago = this.bean.data.IMPORTEPAG;
        if (importePago !== null && importePago !== undefined) {
            this.setValue('de-txtIMPORTEPAGO', importePago);
        }

        // AUDIT INFORMATION
        this.setValue('de-txtUSCR', this.trimValue(this.bean.data.USCR));
        this.setValue('de-txtFECR', this.trimValue(this.bean.data.FECR));
        this.setValue('de-txtHOCR', this.trimValue(this.bean.data.HOCR));
        this.setValue('de-txtPGMCR', this.trimValue(this.bean.data.PGMCR));
        this.setValue('de-txtUSUP', this.trimValue(this.bean.data.USUP));
        this.setValue('de-txtFEUP', this.trimValue(this.bean.data.FEUP));
        this.setValue('de-txtHOUP', this.trimValue(this.bean.data.HOUP));
        this.setValue('de-txtPGMUP', this.trimValue(this.bean.data.PGMUP));
    },
    obtainData: function () {

        console.log("obtainData");

        var cmbFreqType = Ext.getCmp(prototype.id + '-de-cmbFREQTYPE');
        cmbFreqType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["D", "Daily"],
                ["W", "Weekly"],
                ["M", "Monthly"],
                ["N", "Not Scheduled"]
            ]
        }));

        var cmbFREQDAYS = Ext.getCmp(prototype.id + '-de-cmbFREQDAYS');
        cmbFREQDAYS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "All Days"],
                ["W", "Weekdays"],
                ["S", "Weekend"],
                ["", "None"]
            ]
        }));

        var cmb = Ext.getCmp(prototype.id + '-de-cmbSTATUSRO');
        cmb.bindStore(Ext.create('Ext.data.ArrayStore', {
            fields: ['code', 'name'],
            data: [
                ["A", "Active"],
                ["I", "Inactive"]
            ]
        }));

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        console.log('llenarData');

        beanTemp.IN_CCUST = this.trimValue(this.bean.data.CCUST);
        beanTemp.IN_PRDA = this.trimValue(this.bean.data.PRDA);
        beanTemp.IN_CODPRO = this.trimValue(this.bean.data.CODPRO);
        beanTemp.IN_CCUSTPRO = this.trimValue(this.bean.data.CCUSTPRO);
        beanTemp.IN_FLIQUIDACI = this.trimValue(this.bean.data.FLIQUIDACI);
        beanTemp.IN_LIQUIDACIO = this.trimValue(this.bean.data.LIQUIDACIO);
        beanTemp.IN_MERCHAND = this.trimValue(this.bean.data.MERCHAND);
        beanTemp.IN_MONEDA = this.trimValue(this.bean.data.MONEDA);
        beanTemp.IN_CORRL = this.trimValue(this.bean.data.CORRL);
        beanTemp.IN_CODIGO = this.trimValue(this.bean.data.CODIGO);
        beanTemp.IN_IMPORTE = this.getValue('de-txtIMPORTE');
        beanTemp.IN_IMPORTEPAGO = this.getValue('de-txtIMPORTEPAGO');

        console.log(beanTemp);

    },
    llenarDataInsert: function (beanTemp) {
        console.log('llenarData');

        beanTemp.IN_CCUST = this.getValue('de-txtCCUST2');
        beanTemp.IN_PRDA = this.getValue('de-txtPRDA');
        beanTemp.IN_CODPRO = this.getValue('de-txtCODPRO');
        beanTemp.IN_CCUSTPRO = this.getValue('de-txtCCUSTPRO');
        beanTemp.IN_FLIQUIDACI = this.getValue('de-txtFLIQUIDACI');
        beanTemp.IN_LIQUIDACIO = this.getValue('de-txtLIQUIDACIO');
        beanTemp.IN_MERCHAND = this.getValue('de-txtMERCHAND');
        beanTemp.IN_CODIGO = this.getValue('de-txtCODIGO');
        
        beanTemp.IN_MONEDA = this.getValue('de-txtMONEDA');
        beanTemp.IN_IMPORTE = this.getValue('de-txtIMPORTE');
        beanTemp.IN_MONEDA_PAGO = this.getValue('de-txtMONEDAPAGO');
        beanTemp.IN_IMPORTEPAGO = this.getValue('de-txtIMPORTEPAGO');

        console.log(beanTemp);

    },
    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchCodeComision',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                
                if (res.success && res.result) {
                    var comboCodigos = [];
                    var comboMonedas = [["", ""]]; 
                    var comboCcustpros = [];
                    
                    Ext.Array.each(res.result.codigos, function(item) {
                        comboCodigos.push([item.code, item.name]); 
                    });
                    
                    Ext.Array.each(res.result.monedas, function(item) {
                        comboMonedas.push([item.code, item.name]); 
                    });

                    Ext.Array.each(res.result.ccustpros, function(item) {
                        comboCcustpros.push([item.code, item.name]); 
                    });
                    
                    var cmbCodigo = Ext.getCmp(prototype.id + '-de-txtCODIGO');
                    cmbCodigo.getStore().loadData(comboCodigos);
                    cmbCodigo.setValue('COMISI');

                    var cmbCcustpro = Ext.getCmp(prototype.id + '-de-txtCCUSTPRO');
                    cmbCcustpro.getStore().loadData(comboCcustpros);

                    var cmbMoneda = Ext.getCmp(prototype.id + '-de-txtMONEDA');
                    cmbMoneda.getStore().loadData(comboMonedas);
                    
                    var cmbMonedaPago = Ext.getCmp(prototype.id + '-de-txtMONEDAPAGO');
                    cmbMonedaPago.getStore().loadData(comboMonedas); 
                    
                    console.log(me.p,'this.beanthis.bean')
                    meDE.setValue('de-txtCODPRO', meDE.bean.IN_CODPRO);
                    
                }
            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarDataInsert(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2280(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        console.log(btn, 'BTN')
        this.update(btn);
    },
    update: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            this.MaintenanceA2280(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceA2280(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2280: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/updateDiscount',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();

                    var field = Ext.getCmp(prototype.id + '-txtBandocReview');
                    if (field) {
                        // Buscar el panel/componente padre que tenga controlador
                        var parentWithController = field.up('[controller]');

                        if (parentWithController && parentWithController.getController) {
                            var controller = parentWithController.getController();
                            console.log('Controlador encontrado:', controller);

                            if (controller && controller.searchBandocReview) {
                                // Crear evento simulado
                                var e = {
                                    keyCode: 13,
                                    getKey: function () {
                                        return this.keyCode;
                                    },
                                    ENTER: 13,
                                    stopEvent: function () {},
                                    preventDefault: function () {}
                                };

                                // Llamar al método
                                controller.searchBandocReview(field, e);
                                controller.searchDiscountsWMH(field, e);
                            }
                        } else {
                            console.error('No se encontró componente con controlador');
                        }
                    }

                } else {
                    global.Msg({msg: ''});
                }
            }
        });
    },
    //</editor-fold>
    validacionInsert: function (beanTemp) {
        var msjResult = '';
        var camposFaltantes = [];

        var camposBaseRequeridos = [
            { id: "de-txtPRDA", nombre: "PRDA" },
            { id: "de-txtFLIQUIDACI", nombre: "FLIQUIDACI" }
        ];

        Ext.Array.each(camposBaseRequeridos, function(campo) {
            var valor = this.getValue(campo.id);
            if (valor === null || valor === undefined || String(valor).trim() === '') {
                camposFaltantes.push(campo.nombre);
            }
        }, this);

        var valMoneda = this.getValue("de-txtMONEDA");
        var valImporte = this.getValue("de-txtIMPORTE");
        
        var tieneMoneda = (valMoneda !== null && valMoneda !== undefined && String(valMoneda).trim() !== '');
        var numImporte = parseFloat(valImporte) || 0; 
        
        if (tieneMoneda || numImporte !== 0) {
            if (!tieneMoneda) {
                camposFaltantes.push("MONEDA");
            }
            if (numImporte === 0) {
                camposFaltantes.push("IMPORTE");
            }
        }

        var valMonedaPago = this.getValue("de-txtMONEDAPAGO");
        var valImportePago = this.getValue("de-txtIMPORTEPAGO"); 
        
        var tieneMonedaPago = (valMonedaPago !== null && valMonedaPago !== undefined && String(valMonedaPago).trim() !== '');
        var numImportePago = parseFloat(valImportePago) || 0;

        if (tieneMonedaPago || numImportePago !== 0) {
            if (!tieneMonedaPago) {
                camposFaltantes.push("MONEDA PAGO");
            }
            if (numImportePago === 0) {
                camposFaltantes.push("IMPORTE PAGO");
            }
        }

        if (camposFaltantes.length > 0) {
            msjResult = "You must enter the required fields: " + camposFaltantes.join(", ") + ".";
        }

        return msjResult;
    },
    DeshabilitarCampoCreacion: function () {
        let camposDeshabilitar = [
            'de-txtRN',
            'de-txtCODPRO',
            'de-txtCORRL',
            'de-txtUSCR',
            'de-txtFECR',
            'de-txtHOCR',
            'de-txtPGMCR',
            'de-txtUSUP',
            'de-txtFEUP',
            'de-txtHOUP',
            'de-txtPGMUP'
        ];

        camposDeshabilitar.forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(true);
        });

        // IMPORTE es el único editable
        let campoImporte = Ext.getCmp(prototype.id + '-de-txtIMPORTE');
        if (campoImporte)
            campoImporte.setReadOnly(false);
    },
    DeshabilitarCampoClave: function () {

        let camposDeshabilitar = [
            'de-txtRN',
            'de-txtCCUST2',
            'de-txtPRDA',
            'de-txtCODPRO',
            'de-txtCCUSTPRO',
            'de-txtFLIQUIDACI',
            'de-txtLIQUIDACIO',
            'de-txtMERCHAND',
            'de-txtCODIGO',
            'de-txtCORRL',
            'de-txtMONEDA',
            'de-txtMONEDAPAGO',
            'de-txtUSCR',
            'de-txtFECR',
            'de-txtHOCR',
            'de-txtUSUP',
            'de-txtFEUP',
            'de-txtHOUP'
        ];

        camposDeshabilitar.forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(true);
        });

        // IMPORTE es el único editable
        let campoImporte = Ext.getCmp(prototype.id + '-de-txtIMPORTE');
        if (campoImporte)
            campoImporte.setReadOnly(false);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },
    buildCron: function (freqType, freqDays, timeExec) {
        if (!freqType || freqType === "N")
            return "0 0 0 31 2 ?"; // deshabilitado

        let hour = timeExec.substring(0, 2);
        let minute = timeExec.substring(2, 4);

        if (freqType === "D") {
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "W") {
            if (freqDays === "W")
                return `0 ${minute} ${hour} ? * MON-FRI`;
            if (freqDays === "S")
                return `0 ${minute} ${hour} ? * SAT,SUN`;
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "M") {
            return `0 ${minute} ${hour} 1 * ?`;
        }

        return "0 0 0 31 2 ?"; // safe fallback
    }
// </editor-fold>
})
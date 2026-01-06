/* global callbackMostrarData */

Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryPendingBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPendingBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanTemp: {},
    beanResult: {},
    
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'BankReconciliationForm';
        prototype.url = CONTEXTPATH + '/BankReconciliation';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.listaPaises;
        this.lstStatus = this.p.lstStatus;
        this.lstConcept = this.p.lstConcept;
        this.lstAdjType = this.p.lstAdjType;
        
        
        
        
        

    },
    
   
    afterRender: function () {
        
        console.log("FERNADNO TORRES");
        console.log('Datos recibidos del registro:', this.bean);
        
 
  ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS EL CBO REUTILZANDO LA LISTA/////////////////////////
 ///////////////////////SOLO SE USA CUANDO ES ALGO QUE NO PUEDE CAMBIAR COMO PAISES//////

        var obtenerLista = Ext.create('Ext.data.Store', {
            data: this.lstCountry,
            autoLoad: true
        });


        Ext.getCmp(prototype.id + '-cmbCOUNTRY').bindStore(obtenerLista);
        Ext.getCmp(prototype.id + '-cmbCOUNTRY').setValue('');
        

         
         
        switch (this.actionCode) {
            
           
            case 'I':

                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();

                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        
         var statusTxt = '';
         var conceptTxt = '';
         var adjtTxt = '';
                     

    //Ext.getCmp(prototype.id + '-txtSTATUSMPF199').setValue(String(this.bean.O_STVAL).trim());
       this.setValue('txtSTATUSMPF199', this.bean.O_STVAL);
    

 //       this.setValue('txtSTATUSMPF199', this.bean.O_STATUS);



            
//        switch ((this.bean.O_CONCEPT || '').trim()) {
//            case 'P':
//                conceptTxt = 'Positive';
//                break;
//            case 'N':
//                conceptTxt = 'Negative';
//                break;
//            case 'X':
//                conceptTxt = 'No Billing';
//                break;
//            case 'A':
//                conceptTxt = 'Adjustment';
//                break;
//            case 'M':
//                conceptTxt = 'Automatic';
//                break;
//            case 'C':
//                conceptTxt = 'Compensation';
//                break;
//            default:
//                conceptTxt = '';
//        }
//        this.setValue('txtCONCEPTMPF199', conceptTxt);

//        Ext.getCmp(prototype.id + '-txtCONCEPTMPF199').setValue(String(this.bean.O_CONCEPT).trim());
        this.setValue('txtCONCEPTMPF199', this.bean.O_CONCEPT);
//        
//        switch ((this.bean.O_TADJ || '').trim()) {
//             case 'N':
//                adjtTxt = 'Non Remmitance';
//                break;
//            case 'R':
//                adjtTxt = 'Recovery';
//                break;
//            case 'U':
//                adjtTxt = 'Uncleared';
//                break;
//            case 'E':
//                adjtTxt = 'Excess';
//                break;
//            case 'S':
//                adjtTxt = 'Short';
//                break;
//            default:
//                conceptTxt = '';
//            
//        }
//        this.setValue('txtATYPEMPF199', adjtTxt);

//        Ext.getCmp(prototype.id + '-txtATYPEMPF199').setValue(String(this.bean.O_TADJ).trim());
        this.setValue('txtATYPEMPF199', this.bean.O_TADJ);
        
        this.setValue('txtAGENTMPF199', this.bean.O_SAGENT);
        this.setValue('txtVALUEDATEMPF199', this.bean.O_ADATE);
        this.setValue('txtCONSOLMPF199', this.bean.O_SCONSOL);
        this.setValue('txtCURRENCYMPF199', this.bean.O_SCURRENCY);
        this.setValue('txtNETOMPF199', this.bean.O_NETO);
        this.setValue('txtIPAYMPF199', this.bean.O_PAYAMOU);
        this.setValue('txtSTARTMPF199', this.bean.O_STRDATE);
        this.setValue('txtENDMPF199', this.bean.O_ENDDATE);
        this.setValue('txtREFEMPF199', this.bean.O_REFERENCE);
        this.setValue('txtCOMMENTSMPF199', this.bean.O_COMMENTS);
        this.setValue('cmbCOUNTRY', this.bean.O_SCOUNTRY);
        
      
        
        
        
        
        this.setValue('txtUSUP', this.bean.O_USUP);
        this.setValue('txtFEUP', this.bean.O_FEUP);
        this.setValue('txtHOUP', this.bean.O_HOUP);
        this.setValue('txtUSCR', this.bean.O_USCR);
        this.setValue('txtFECR', this.bean.O_FECR);
        this.setValue('txtHOCR', this.bean.O_HOCR);
        
        

    },

  
    llenarData:function(beanTemp){
        
        
        beanTemp.O_CCUST = this.bean.O_CCUST;
        beanTemp.O_ADATE = this.bean.O_ADATE;
        beanTemp.O_SCOUNTRY = this.bean.O_SCOUNTRY;
        beanTemp.O_SAGENT = this.getValue("txtAGENTMPF199");
        beanTemp.O_SCURRENCY = this.bean.O_SCURRENCY;
        beanTemp.O_CBATCH = this.bean.O_CBATCH;
        beanTemp.O_SEQ = this.bean.O_SEQ;
        beanTemp.O_NSAGENT = this.bean.O_SAGENT;
        
        
        
        
        
        beanTemp.O_USUP = this.getValue("txtUSUP").trim();
        beanTemp.O_FEUP = this.getValue("txtFEUP").trim();
        beanTemp.O_HOUP = this.getValue("txtHOUP").trim();
        beanTemp.O_USCR = this.getValue("txtUSCR").trim();
        beanTemp.O_FECR = this.getValue("txtFECR").trim();
        beanTemp.O_HOCR = this.getValue("txtHOCR").trim();
        
        
        
   
        
    },
    
    
    llenarDataInsert:function(beanTemp){
        
        
 
        beanTemp.O_SAGENT = this.getValue("txtAGENTMPF199");
        beanTemp.O_STVAL = this.getValue("txtSTATUSMPF199");  
        beanTemp.O_ADATE = this.getValue("txtVALUEDATEMPF199");
        beanTemp.O_CONCEPT = this.getValue("txtCONCEPTMPF199");
        beanTemp.O_TADJ = this.getValue("txtATYPEMPF199");
        beanTemp.O_SCONSOL = this.getValue("txtCONSOLMPF199");
        beanTemp.O_SCURRENCY = this.getValue("txtCURRENCYMPF199");
        beanTemp.O_NETO = this.getValue("txtNETOMPF199");
        beanTemp.O_PAYAMOU = this.getValue("txtIPAYMPF199");
        beanTemp.O_STRDATE = this.getValue("txtSTARTMPF199");
        beanTemp.O_ENDDATE = this.getValue("txtENDMPF199");
        beanTemp.O_SCOUNTRY = this.getValue("cmbCOUNTRY");
        beanTemp.O_REFERENCE = this.getValue("txtREFEMPF199");
        beanTemp.O_COMMENTS = this.getValue("txtCOMMENTSMPF199");
        
        
        
//        beanTemp.O_USUP = this.getValue("txtUSUP").trim();
//        beanTemp.O_FEUP = this.getValue("txtFEUP").trim();
//        beanTemp.O_HOUP = this.getValue("txtHOUP").trim();
//        beanTemp.O_USCR = this.getValue("txtUSCR").trim();
//        beanTemp.O_FECR = this.getValue("txtFECR").trim();
//        beanTemp.O_HOCR = this.getValue("txtHOCR").trim();
//        
        
        
   
        
    },
    
    
//    <editor-fold defaultstate="collapsed" desc="Botones">


    onSaveClick: function (btn) {
        var exceptionCode = this.getValue('txtExceptionExterior');
        var urlAction;
        var exceptionName;
        var beanTemp = {};

        // --- NUEVA VALIDACIÓN PARA INDIA (Código 2) ---
        if (exceptionCode === '2') {
            var montoManual = this.getCleanNumberValue("txtRecaudacionUSD");
            var montoGrid = this.totalGridTemp || 0; // Recuperamos lo que guardó la lupa

            // Calculamos diferencia absoluta para evitar problemas de decimales
            var diferencia = Math.abs(montoManual - montoGrid);

            // Si hay diferencia (mayor a 1 centavo) o el monto es 0
            if (diferencia > 0.01 || montoManual === 0) {
                Ext.Msg.alert('Descuadre', 
                    'No se puede guardar. El monto reportado (' + Ext.util.Format.usMoney(montoManual) + 
                    ') no coincide con la selección de la grilla (' + Ext.util.Format.usMoney(montoGrid) + ').'
                );
                return; // <--- AQUÍ SE DETIENE TODO, NO GUARDA
            }
        }
        // ----------------------------------------------

        switch (exceptionCode) {
            case '1': // ARGENTINA
                this.llenarDataArgentina(beanTemp);
                urlAction = '/MaintenanceMPF199insertArgentina';
                exceptionName = 'Argentina';
                break;

            case '2': // INDIA
                this.llenarDataIndia(beanTemp);
                urlAction = '/MaintenanceMPF199insertIndia';
                exceptionName = 'India';
                break;

            default: // ALL
                this.llenarDataInsert(beanTemp);
                urlAction = '/MaintenanceMPF199insert';
                exceptionName = 'All';
                break;
        }

        // ... (Resto del código original de confirmación y envío) ...
        beanTemp.option = 'I'; 

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert data for ' + exceptionName + '?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.MaintenanceMPF199Generic(beanTemp, urlAction, exceptionName);
                }
            }
        });
    },

      
      
    onUpdateClick: function (btn) {
//        var msj = this.validateDates();

//        if (msj === '') {
            Ext.Msg.show(
                    {
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to Update?',
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
//                                beanTemp.beanString = JSON.stringify(beanTemp);
                                this.MaintenanceMPF199(beanTemp);
                            }
                        }
                    });
       
    },

//    onDeleteClick: function (btn) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to delete ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    var beanTemp = {};
//                    beanTemp.option = 'D';
//                    beanTemp.beanString = JSON.stringify(this.beanResult);
//                    this.MaintenanceA4169(beanTemp);
//                }
//            }
//        });
//    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    

    MaintenanceMPF199: function (beanTemp) {

        Ext.getCmp(prototype.id + '-dataEntryPending').mask('Loading...');
                
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF199',
            method: 'POST',
            timeout: 60000000,
             params: {
            beanString: Ext.encode(beanTemp)
        },
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryPending').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
//                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    
                    Ext.getCmp('BankReconciliationForm-dataEntryPending').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },
    
    // insert
    
    llenarDataArgentina: function (beanTemp) {
        var radioGroup = Ext.getCmp(prototype.id + '-rdMonedaGroup');
        var monedaSeleccionada = radioGroup ? radioGroup.getValue().moneda : 'ARS';

        beanTemp.O_MONEDA = monedaSeleccionada;
        beanTemp.O_RECAUDACION = this.getCleanNumberValue("txtRECAUDACION");
        beanTemp.O_COMISIONMEP = this.getCleanNumberValue("txtComisionMEP");
        beanTemp.O_IVA = this.getCleanNumberValue("txtIVA");
        beanTemp.O_NETORENDIDO = this.getCleanNumberValue("txtNETORENDIDO");
        beanTemp.O_EXCEPTION_CODE = this.getValue("txtExceptionExterior");
        if (monedaSeleccionada === 'ARS') {
            // --- MODO PESOS ---
            beanTemp.O_TASA = this.getCleanNumberValue("txtTASA");
            beanTemp.O_RENDICION = this.getCleanNumberValue("txtRendicion");
            beanTemp.O_PAGOTERCERO = this.getCleanNumberValue("txtPagoTercero");
            beanTemp.O_EVENTO = 0; 

        } else {
            beanTemp.O_TASA = 0;
            beanTemp.O_RENDICION = 0;
            beanTemp.O_PAGOTERCERO = 0;
            beanTemp.O_EVENTO = this.getCleanNumberValue("txtMontoExento");
        }
    },
    
    
    getCleanNumberValue: function (id) {
        var val = this.getValue(id);
        if (typeof val === 'string') {
            val = val.replace(/,/g, ''); 
            val = val.replace(/[^0-9.-]/g, ''); 
        }
        return val; 
    },
    
    MaintenanceMPF199Generic: function (beanTemp, urlAction, exceptionName) {
        var finalUrl = (prototype && prototype.url) ? (prototype.url + urlAction) : (CONTEXTPATH + '/BankReconciliation' + urlAction);

        Ext.getCmp(prototype.id + '-dataEntryPending').mask('Saving data for ' + exceptionName + '...');
        Ext.Ajax.request({
            url: finalUrl, 
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: Ext.encode(beanTemp)
            },
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryPending').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    global.Msg({msg: res.Mensaje}); 
                    Ext.getCmp('BankReconciliationForm-dataEntryPending').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: 'Error: ' + res.Mensaje}); 
                }
            }
        });
    },
    
    // Agrega esta función utilitaria a tu controlador
calculateNeto: function () {
    var me = this;
    var prototypeId = prototype.id;

    // --- 1. Helper para obtener números limpios ---
    var getNumericValue = function (id) {
        var cmp = Ext.getCmp(prototypeId + '-' + id);
        if (!cmp) return 0; // Seguridad por si el campo no existe
        
        var val = cmp.getValue();
        if (typeof val === 'string') {
            val = val.replace(/\./g, '').replace(/,/g, '.');
        }
        return Ext.Number.parseFloat(val) || 0;
    };

    // --- 2. Detectar Moneda Seleccionada ---
    var radioCmp = Ext.getCmp(prototypeId + '-rdMonedaGroup');
    // Si por alguna razón no está cargado aún, asumimos 'ARS' por defecto
    var moneda = radioCmp ? radioCmp.getValue().moneda : 'ARS'; 

    // --- 3. Obtener Valores Comunes (Existen en ambos casos) ---
    var recaudacion = getNumericValue('txtRECAUDACION');
    var comisionMEP = getNumericValue('txtComisionMEP');
    var iva = getNumericValue('txtIVA');
    
    var descuentos = 0;

    // --- 4. Lógica Condicional ---
    if (moneda === 'ARS') {
        var tasa = getNumericValue('txtTASA');
        var rendicion = getNumericValue('txtRendicion');
        var pagoTercero = getNumericValue('txtPagoTercero');
        
        descuentos = tasa + rendicion + pagoTercero + comisionMEP + iva;

    } else {
       var montoExento = getNumericValue('txtMontoExento'); 
    
        descuentos = comisionMEP + iva;        
        descuentos = descuentos + montoExento;
    }

    var netoRendido = recaudacion - descuentos;
    
    var formattedNeto = Ext.util.Format.number(netoRendido, '0,000.00');
    Ext.getCmp(prototypeId + '-txtNETORENDIDO').setValue(formattedNeto);
},
    
    onExceptionSelect: function (combo, record) {
        var selectedCode = record.get('code'); 

        var pnlRendicion = Ext.getCmp(prototype.id + '-pnlRENDICIONBSP');
        var pnlPendingFields = Ext.getCmp(prototype.id + '-pnlPENDINGFIELDS'); 
        var pnlConversionIND = Ext.getCmp(prototype.id + '-pnlConversionIND'); 

        var titleArgentina = Ext.getCmp(prototype.id + '-titleBspArgentina');
        var titleIndia = Ext.getCmp(prototype.id + '-titleBspIndia'); 



        // ARGENTINA (Código '1')
        var isArgentina = (selectedCode === '1');
        if (pnlRendicion) pnlRendicion.setVisible(isArgentina);
        if (titleArgentina) titleArgentina.setVisible(isArgentina);

        // INDIA (Código '2')
        var isIndia = (selectedCode === '2');
        if (pnlConversionIND) pnlConversionIND.setVisible(isIndia);
        if (titleIndia) titleIndia.setVisible(isIndia);

        // ALL (Código '')
        var isAll = (selectedCode === '');
        if (pnlPendingFields) pnlPendingFields.setVisible(isAll);

        if (!isArgentina && pnlRendicion && pnlRendicion.getForm) {
            pnlRendicion.getForm().reset();
        }
        if (!isIndia && pnlConversionIND && pnlConversionIND.getForm) {
            pnlConversionIND.getForm().reset();
        }

    },

    getStoreMontos: function() {
        if (this.storeMontos) return this.storeMontos;

        this.storeMontos = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'SCOUNTRY',  mapping: 'O_SCOUNTRY'},
                {name: 'SCURRENCY', mapping: 'O_SCURRENCY'},
                {name: 'ADATE',     mapping: 'O_ADATE'},
                {name: 'MONTO',     mapping: 'O_NETO'}, 
                {name: 'STVAL',     mapping: 'O_STVAL'}
            ],
            proxy: {
                type: 'ajax',
                url: prototype.url + '/listPendingAmounts', 
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    successProperty: 'success'
                },
                timeout: 60000 
            },
            autoLoad: false
        });

        return this.storeMontos;
    },

    mostrarVentanaSeleccion: function() {
    var me = this;
    var dtField = Ext.getCmp(prototype.id + '-dtValueDate');
    var valueDateRaw = dtField.getValue();

    if (!valueDateRaw) {
        Ext.Msg.show({
            title: 'Atención',
            msg: 'Por favor, seleccione un <b>Value Date</b> antes de buscar.',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });
        return; 
    }

    var formattedDate = Ext.Date.format(valueDateRaw, 'Ymd'); 

    var store = me.getStoreMontos();
    
    store.removeAll();
    
    store.load({
        params: {
            adate: formattedDate,
            scountry: 'IN', 
            action: 'GET_PENDING' 
        },
        callback: function(records, operation, success) {
            if (!success) {
                Ext.Msg.alert('Error', 'No se pudieron cargar los datos del servidor.');
            } else if (records.length === 0) {
                Ext.toast('No se encontraron registros pendientes para esa fecha.', 'Info');
            }
        }
    });

    // 3. CREAR/MOSTRAR VENTANA (Igual que antes, pero ahora el store se llena solo)
    var win = Ext.create('Ext.window.Window', {
        title: 'Selección de Montos Pendientes (' + Ext.Date.format(valueDateRaw, 'd/m/Y') + ')',
        width: 600,
        height: 400,
        modal: true,
        layout: 'fit',
        items: [{
            xtype: 'grid',
            store: store, // El store ya se está cargando asíncronamente
            id: prototype.id + '-gridMontos',
            selModel: {
                selType: 'checkboxmodel',
                mode: 'SIMPLE',
                listeners: {
                    selectionchange: function(sm, selections) {
                        var total = 0;
                        // OJO: Asegúrate que el campo del store se llame 'MONTO' o como venga del backend
                        Ext.each(selections, function(rec) { 
                            // Parsear a float por si viene como string del backend
                            total += parseFloat(rec.get('MONTO')); 
                        });
                        
                        win.down('#displayTotalGrid').setValue(Ext.util.Format.usMoney(total));
                        win.totalTemp = total;
                    }
                }
            },
            columns: [
                { text: 'País', dataIndex: 'SCOUNTRY', width: 60 },
                { text: 'Moneda', dataIndex: 'SCURRENCY', width: 70 },
                // Formateamos la fecha visualmente en la grilla
                { text: 'Fecha', dataIndex: 'ADATE', width: 100, renderer: function(v) { return v; } }, 
                { text: 'Monto', dataIndex: 'MONTO', flex: 1, renderer: Ext.util.Format.usMoney, align: 'right' },
                { text: 'Estado', dataIndex: 'STVAL', width: 90 }
            ],
            bbar: [
                '->',
                {
                    xtype: 'displayfield',
                    itemId: 'displayTotalGrid',
                    fieldLabel: 'Total Seleccionado',
                    value: '$0.00',
                    fieldStyle: 'font-weight:bold;color:green;font-size:14px;'
                },
                '-',
                {
                    text: 'Confirmar',
                    iconCls: 'fa fa-check', // O tu icono 'prx-icon-save'
                    handler: function() {
                        var totalGrid = win.totalTemp || 0;
                        me.validarYSetearDatos(totalGrid);
                        win.close();
                    }
                }
            ]
        }]
    });
    
    win.show();
},

// === NUEVO: Lógica de Validación ===
validarYSetearDatos: function(totalGrid) {
    var cmpMontoUSD = Ext.getCmp(prototype.id + '-txtRecaudacionUSD'); 
    var cmpSeleccion = Ext.getCmp(prototype.id + '-txtSeleccionados');
    var btnSave = Ext.getCmp(prototype.id + '-btn-save'); // ID correcto de tu botón Save
    
    var montoManual = cmpMontoUSD.getValue();

    // Mostrar total en el campo gris
    cmpSeleccion.setValue('Total Seleccionado: ' + Ext.util.Format.usMoney(totalGrid));

    // Validar diferencia
    var diferencia = Math.abs(montoManual - totalGrid);

    if (diferencia < 0.01 && montoManual > 0) {
        Ext.toast('¡Montos Cuadrados Correctamente!', 'Éxito');
        if(btnSave) btnSave.enable(); 
    } else {
        Ext.Msg.alert('Descuadre', 'El monto reportado ($' + montoManual + ') no coincide con la selección ($' + totalGrid + ').');
        if(btnSave) btnSave.disable();
    }
    
    // Guardamos el total grid en una variable temporal del controlador para re-validar si cambian el manual
    this.totalGridTemp = totalGrid; 
},

// === NUEVO: Listener para el botón Lupa ===
onLupaClick: function() {
    this.mostrarVentanaSeleccion();
},

// === MODIFICACIÓN IMPORTANTE: llenarDataIndia ===
// Actualiza esta función para leer los nuevos campos
llenarDataIndia: function (beanTemp) {
    // Ya no existe INR, se usa Value Date y USD
    beanTemp.O_ADATE = Ext.util.Format.date(this.getValue("dtValueDate"), 'Ymd'); // Formato DB
    beanTemp.O_RECAUDACION_USD = this.getCleanNumberValue("txtRecaudacionUSD");
    beanTemp.O_EXCEPTION_CODE = this.getValue("txtExceptionExterior");
    // Si necesitas guardar el detalle de los montos seleccionados, deberías hacerlo aquí
},

validarYSetearDatos: function(totalGrid) {
    var cmpSeleccion = Ext.getCmp(prototype.id + '-txtSeleccionados');
    
    // 1. Guardamos el total en una variable del controlador para usarla al guardar
    this.totalGridTemp = totalGrid; 

    // 2. Solo actualizamos el texto visual para que el usuario sepa cuánto lleva
    if (cmpSeleccion) {
        cmpSeleccion.setValue('Total Seleccionado: ' + Ext.util.Format.usMoney(totalGrid));
    }
},


    DeshabilitarCampoClave: function () {
//        Ext.getCmp(prototype.id + '-DEtxtUSERNAME').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-cmbTYPE').setReadOnly(true);
    },


    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
//        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
//            Ext.getCmp(prototype.id + '-lbldes').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes').show();
//        }
    },
    Habilitarlbl1: function () {
//        Ext.getCmp(prototype.id + '-lbldes').hide();
//        if (this.getValue("txtCODSOUR") == '') {
//            Ext.getCmp(prototype.id + '-lbldes2').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes2').show();
//        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    
    
    
    getValue: function (id) {
        console.log('VALIDAR ACA',prototype.id + '-' + id);
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
    }
// </editor-fold>
});
    
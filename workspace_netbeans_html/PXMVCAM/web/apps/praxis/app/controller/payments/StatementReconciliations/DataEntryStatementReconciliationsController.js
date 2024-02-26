Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryStatementReconciliationsController',
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
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
//        this.obtainData();
    },
    afterRender: function () {
//        this.obtainData();
        switch (this.actionCode) {
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtCODEBANKA', this.beanResult.CODEBANKA);
        this.setValue('de-txtNAME', this.beanResult.NAME);
        this.setValue('de-txtSTVAL', this.beanResult.descSTVAL);
        if (this.beanResult.descSTVAL === 'Match' || this.beanResult.descSTVAL === 'Match Manual') {
            Ext.getCmp(prototype.id + '-gridColumnDelete').hide();
            Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(985);
        } else {
            Ext.getCmp(prototype.id + '-gridColumnDelete').show();
            Ext.getCmp(prototype.id + '-gridDataInfoScan').setWidth(1025);

        }
        this.setValue('de-txtDATEC', this.beanResult.DATEC);
        this.setValue('de-txtQTYTRAN1', this.beanResult.QTYTRAN1);
        this.setValue('de-txtVALDATE', this.beanResult.VALDATE);
        this.setValue('de-txtUNICODE', this.beanResult.UNICODE);
        this.setValue('de-txtBANDOC', this.beanResult.BANDOC);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtNETO', Ext.util.Format.number(this.beanResult.NETO, '0,000.00'));
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATEL);
        this.setValue('de-txtUNICODEL', this.beanResult.UNICODEL);
        this.setValue('de-txtBANDOCL', this.beanResult.BANDOCL);
        this.setValue('de-txtSCURRENCYL', this.beanResult.SCURRENCY); //DEBERÍA SER DE LA 060 PERO NO HAY
        this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETOL, '0,000.00'));
        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtACCNUMBER', this.beanResult.ACCNUMBER);
        this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.DIFF, '0,000.00'));
        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        var bean = {};
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
        bean.CODEBANKA = this.getValue("de-txtCODEBANKA");
        bean.NAME = this.getValue("de-txtNAME");
        bean.STVAL = this.getValue("de-txtSTVAL");
        bean.DATEC = this.getValue("de-txtDATEC");
        bean.QTYTRAN1 = this.getValue("de-txtQTYTRAN1");
        bean.VALDATE = this.getValue("de-txtVALDATE");
        bean.UNICODE = this.getValue("de-txtUNICODE");
        bean.BANDOC = this.getValue("de-txtBANDOC");
        bean.NETO = this.getValue("de-txtNETO");
        bean.VALDATEL = this.getValue("de-txtVALDATEL");
        bean.UNICODEL = this.getValue("de-txtUNICODEL");
        bean.BANDOCL = this.getValue("de-txtBANDOCL");
        bean.SCURRENCYL = this.getValue("de-txtSCURRENCYL");
        bean.NETOL = this.getValue("de-txtNETOL");
        bean.SDATE = this.getValue("de-txtSDATE");
        bean.ACCNUMBER = this.getValue("de-txtACCNUMBER");
        bean.DIFF = this.getValue("de-txtDIFF");
        bean.USCR = this.getValue("txtUSCR").trim();
        bean.FECR = this.getValue("txtFECR").trim();
        bean.HOCR = this.getValue("txtHOCR").trim();
        bean.USUP = this.getValue("txtUSUP").trim();
        bean.FEUP = this.getValue("txtFEUP").trim();
        bean.HOUP = this.getValue("txtHOUP").trim();
        console.log(bean.SAGENT);
        return bean;
    },
    getData: function () {
        meDE.bean.data.IN_VALDATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_UNICODE = meDE.bean.data.UNICODE;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                meDE.onSearchCompleteDetail();
                meDE.mostrarData();
            }
        });
    },
    onSearchCompleteDetail: function () {
        meDE.bean.data.IN_VALDATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_UNICODE = meDE.bean.data.UNICODE;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_DETAIL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    global.Msg({msg: res.Mensaje});
                }

            }
        });
    },
    //</editor-fold>
    calcularMontos: function () {

        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        if (store.getCount() > 0 && store.getCount() < 22) {
            calculateButton.show();
        } else {
            calculateButton.hide();
        }

        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            if (dataRow1.data.STMANUAL !== 'Blocked') {
                this.sumAmount = this.sumAmount + dataRow1.data.NETO; //+ dataRow1.data.SADJUST;
            }
        }

        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        this.setValue('de-txtNETOL', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    calcularDiferencias: function () {
        console.log('calcular diferencias');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        if (store.getCount() > 0 && store.getCount() < 22) {

            var model = grid.getStore().getModel();
            var suma = 0;
            grid.getStore().each(function (record) {
                suma += record.get('NETO');
            });
            var diff = Math.abs(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));
            console.log(diff);

            var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            var store = grid.getStore();
            var records = store.getRange();
            this.desmarcarRegistros(records);
            if (diff !== 0) {
                var timeout = 6000; // 6 segundos
                var startTime = new Date().getTime();

                var findCombinationsWithTimeout = function () {
                    var currentTime = new Date().getTime();
                    if (currentTime - startTime < timeout) {
                        this.findCombinations(records, 0, 0, [], diff);
                    } else {
                        console.log('Tiempo límite alcanzado. La búsqueda se ha interrumpido.');
                    }
                }.bind(this);

                setTimeout(findCombinationsWithTimeout, 0);
            } else {
                this.desmarcarRegistros(records);
            }
        } else {
//            this.desmarcarRegistros(records);
        }

    },

    findCombinations: function (records, index, sum, combination, diff) {
        if (sum === diff) {
            this.mostrarCombinacionValida(combination, diff);
            combination.forEach(function (record) {
                record.set('isInValidCombination', true); // Marcar los registros de combinación válida
            });
            return;
        }
        if (index >= records.length || sum > diff) {
            return;
        }

        // Usa 'this.findCombinations' para llamar a la función recursiva
        this.findCombinations(records, index + 1, sum + records[index].get('NETO'), combination.concat(records[index]), diff);
        // Pasa el argumento 'diff' a la función recursiva
        this.findCombinations(records, index + 1, sum, combination, diff);
    },

    getExcel: function (records, index, sum, combination, diff) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcelEntry();
                }
            }
        });
    },
    exportExcelEntry: function () {
        let miGrilla2 = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let datos2 = {};
        if (miGrilla2) {
            datos2 = this.procesarRegistros(miGrilla2);
//            console.log(datos2);
            if (Array.isArray(datos2) && datos2.length === 0) {
                // Nadine
            } else {
                this.enviarDatosAlServidor(datos2);
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    enviarDatosAlServidor: function (datos) {
        Ext.Ajax.request({
            url: prototype.url + '/getXLSXEntry',
            method: 'POST',
            params: {
                beanString: datos
            },
            responseType: 'blob', // Especifica que esperamos un Blob como respuesta
            success: function (response) {
                console.log(response);
                console.log(response.responseText);
                var blob = new Blob([response.responseText], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                var url = window.URL.createObjectURL(blob);

                var a = document.createElement('a');
                a.href = url;
                a.download = meDE.obtenerNombreArchivo(response); // Establece el nombre del archivo
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            },

            failure: function (response) {
                console.error('Error al enviar los datos al servidor:', response.statusText);
            }
        });
    },

// Función para obtener el nombre del archivo de la respuesta
    obtenerNombreArchivo: function (response) {
        var disposition = response.getResponseHeader('Content-Disposition');
        var matches = /filename="?([^"]+)"?/.exec(disposition);
        if (matches !== null && matches[1]) {
            return matches[1];
        } else {
            return 'archivo.xlsx'; // Nombre predeterminado si no se puede obtener del encabezado
        }
    },

    mostrarCombinacionValida: function (combination, diff) {
        console.log('Se encontró una combinación válida:');
        console.log('Valor deseado:', diff);
        console.log('Registros:');
        combination.forEach(function (record) {
            console.log(record.get('NETO'));
        });
    },
    desmarcarRegistros: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidCombination')) {
                record.set('isInValidCombination', false); // Desmarcar el registro
            }
        });
    },
    removeTKT: function (grid, rowIndex, colIndex) {

        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
        var checkbox = Ext.getCmp(prototype.id01 + '-chkVALDATE');
        var estaMarcado = checkbox.getValue();
        if (estaMarcado) {
//            console.log('El checkbox está marcado');
            meDE.calcularDiferencias();
        } else {
//            console.log('El checkbox no está marcado');
        }
    },
    cambiaParams: function (checkbox, newValue, oldValue, eOpts) {

        meDE.bean.data.IN_VALDATE = meDE.bean.data.VALDATE;
        meDE.bean.data.IN_CODEBANK = meDE.bean.data.CODEBANK;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_NETO = meDE.bean.data.NETO + "";
        meDE.bean.data.IN_RED = meDE.bean.data.RED;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        if (meDE.bean.data.IN_STVAL === 'Match' || meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '1';
        } else {
            meDE.bean.data.IN_STVAL = 'P';
        }
        if (newValue) {
            console.log('El checkbox está marcado');
            meDE.bean.data.IN_UNICODE = meDE.bean.data.UNICODE;
            var beanString = JSON.stringify(meDE.bean.data);
            Ext.Ajax.request({
                url: prototype.url + '/searchBean_DETAIL',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                params: {beanString: beanString},
                success: function (response, options) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {

                        var storeData = Ext.create('Ext.data.Store', {
                            data: res.data,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                        meDE.calcularMontos();
                        meDE.calcularDiferencias();
                    } else {
                        global.Msg({msg: res.Mensaje});
                    }
                }
            });
        } else {
            console.log('El checkbox está desmarcado');
            meDE.bean.data.IN_UNICODE = '';
            var beanString = JSON.stringify(meDE.bean.data);
            Ext.Ajax.request({
                url: prototype.url + '/searchBean_DETAIL',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                params: {beanString: beanString},
                success: function (response, options) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {

                        var storeData = Ext.create('Ext.data.Store', {
                            data: res.data,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeData);
                        meDE.calcularMontos();
                    meDE.calcularDiferencias();
                    } else {
                        global.Msg({msg: res.Mensaje});
                    }
                }
            });
        }

    },
//<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtSCOUNTRY', '');
        this.setValue('cmbSTVAL', '');
        this.setValue('txtSDATE', '');
        this.setValue('txtADATE', '');
        this.setValue('txtCODEBANK', '');
        this.setValue('txtBANDOC', '');
        this.setValue('txtSCURRENCY', '');
        this.setValue('txtNETO', '');
        this.setValue('txtQTYTRAN1', '');
        this.setValue('txtQTYTRAN3', '');
        this.setValue('txtVALDATE', '');
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
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        var deci = this.preexecuteOption();
        if (deci) {
            Ext.Msg.show({
                title: '.:Confirmation:.',
                msg: 'Are you sure to Update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
//            animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        beanTemp = this.llenarData();
                        beanTemp.option = 'U';
//                        beanTemp.beanString = JSON.stringify(meDE.bean);
                        this.maintenanceBean(beanTemp);
                    }
                }
            });
        }
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
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    preexecuteOption: function () {

        var decide = false;
        var ASVFOP = Ext.getCmp(prototype.id + '-de-txtNETO').getValue().replace(/,/g, '').replace('.00', '');
        var BSVFOP = Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', '');
        if (ASVFOP === BSVFOP) {

            let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            let datos = {};
            datos = this.procesarRegistros(miGrilla);
            if (Array.isArray(datos) && datos.length === 0) {
                // Nadine
            } else {
                console.log('modificable');
                decide = true;
            }


        } else {
            global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Stattement.'});
        }
        return decide;
    },
    maintenanceBean: function (option) {
        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let datos = {};
        if (miGrilla) {
            // Llamada a la función procesarRegistros con la grilla como parámetro
            console.error('Entró al procesar Registros');
            datos = this.procesarRegistros(miGrilla);
//            console.log(datos);
            if (Array.isArray(datos) && datos.length === 0) {
                // Nadine
            } else {
                Ext.Ajax.request({
                    url: prototype.url + '/executeOption',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntry').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    //exito
                                    Ext.getCmp(prototype.id + '-dataEntry').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    }
                });
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    //</editor-fold>

    procesarRegistros: function (grilla, miGrillaAdj) {
        var listaDeDatos = [];
        grilla.getStore().each(function (record) {

            let registro = {
                CODEBANK: Ext.getCmp(prototype.id + '-de-txtCODEBANK').getValue(),
                VALDATE: Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue(),
                UNICODE: Ext.getCmp(prototype.id + '-de-txtUNICODE').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
//                descSTVAL: record.get('descSTVAL').trim(),
                SDATE: record.get('SDATE').trim(),
                SAGENT: record.get('SAGENT').trim(),
                TERMI: record.get('TERMI').trim(),
                CARDTYPE: record.get('CARDTYPE').trim(),
                SCARDN: record.get('SCARDN').trim(),
                SAUTHOC: record.get('SAUTHOC').trim(),
                SCURRENCY: 'COP',
                TOTAL: record.get('TOTAL'),
                NETO: record.get('NETO'),
                RED: record.get('RED').trim()
            };
//            console.log(registro);
            listaDeDatos.push(registro);
        });
        // Convertir la lista a JSON
        var datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

//        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
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
        if (this.getValue("txtCODSOUR") == '') {
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
    }
// </editor-fold>
});
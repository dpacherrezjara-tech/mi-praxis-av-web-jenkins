/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ADJAccounting.DataEntryNewADJAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryNewADJAccountingController',
    paramsDE: {},
    numaero: '',
    SET: '',
    winBrowser: '',
    listloadTicket: {},
    listAddNuewdatos: {},
    listdatosguadar: {},
    urlWin01: CONTEXTPATH + '/ADJAccounting',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        var tabMain = Ext.getCmp(prototype.idadjnew + '-tabMain');
        var grid03 = Ext.getCmp(prototype.idadjnew + '-gridDataCabe');
        var txaReference1 = Ext.getCmp(prototype.idadjnew + '-txaReference1');
        var btnsave = Ext.getCmp(prototype.idadjnew + '-btn-save');
        me.setStores();
        me.onLoadDataQuery();
        switch (String(me.view.params.action)) {
            case 'LE':
                txaReference1.show();
                me.onLoadDataLE();
                grid03.show();
                tabMain.hide();
                btnsave.hide();
                break;
            case 'ES':
                grid03.hide();
                tabMain.show();
                txaReference1.hide();
                btnsave.show();
                break;
        }
        //this.CleanFields();

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData');
        var grid02 = Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData');
        var grid03 = Ext.getCmp(prototype.idadjnew + '-de-gridDataDetail');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idadjnew + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idadjnew + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idadjnew + '-store-grid03'
        });
        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
    },
    onLoadDataQuery: function () {
        var cmbSearch = Ext.getCmp(prototype.idadjnew + '-search-byedt');
        var CmbTtraxedt1 = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1');
        var CmbTtraxedt2 = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2');
        var cmbTYPEUSE = Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE');
        var cmbTYUSEASS = Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ACCOUNTING ADJUSTMENT"},
                {"code": "2", "name": "USE ADJUSTMENT"}
            ]
        }));
        CmbTtraxedt1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SALE"},
                {"code": "2", "name": "EXCH"},
                {"code": "3", "name": "RFND"},
                {"code": "5", "name": "FLOWN"},
                {"code": "6", "name": "EXCP"},
                {"code": "7", "name": "RFCP"},
                {"code": "8", "name": "IXP"},
                {"code": "9", "name": "DISC"},
                {"code": "10", "name": "IXC OAL"},
                {"code": "13", "name": "EMD-FLOWN"}
            ]
        }));
        CmbTtraxedt2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "5", "name": "FLOWN"},
                {"code": "6", "name": "EXCP"},
                {"code": "7", "name": "RFCP"},
                {"code": "8", "name": "IXP"},
                {"code": "9", "name": "DISC"},
                {"code": "10", "name": "IXC OAL"},
                {"code": "13", "name": "EMD-FLOWN"}
            ]
        }));

        cmbTYPEUSE.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "AA0004", "name": "ADD USED"},
                {"code": "AA0002", "name": "DUPLICATED COUPON REVERSION"},
                {"code": "AA0001", "name": "USED COUPON ANNULMENT"}

            ]
        }));
        cmbTYUSEASS.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "0", "name": "NO"},
                {"code": "1", "name": "SI"}
            ]
        }));

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var CmbTtraxedt1 = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1');
        var CmbTtraxedt2 = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2');
        var cmbTYPEUSE = Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE');
        var cmbTYUSEASS = Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS');
        var cabORIGEN = Ext.getCmp(prototype.idadjnew + '-cab-ORIGEN');
        var cabORIGEN2 = Ext.getCmp(prototype.idadjnew + '-cab-ORIGEN2');
        if (obj.getValue() === "1") {
            cmbTYPEUSE.hide();
            cmbTYUSEASS.hide();
            cabORIGEN.hide();
            cabORIGEN2.hide();
            CmbTtraxedt1.show();
            CmbTtraxedt2.hide();
            Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').setValue('');
        } else if (obj.getValue() === "2") {
            CmbTtraxedt1.hide();
            CmbTtraxedt2.show();
            cmbTYPEUSE.show();
            cmbTYUSEASS.show();
            cabORIGEN.show();
            cabORIGEN2.show();
            Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').setValue('');
        } else {
            CmbTtraxedt1.hide();
            CmbTtraxedt2.hide();
            Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').setValue('');
            Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').setValue('');
        }
    },
    onCmbSearchChangeCmbT1: function (obj, records, eOpts) {
        var txtCpn0 = Ext.getCmp(prototype.idadjnew + '-txtCpn0');
        var txtCpn1 = Ext.getCmp(prototype.idadjnew + '-txtCpn');
        if (obj.getValue() === '5' || obj.getValue() === '6' || obj.getValue() === '7' || obj.getValue() === '8' || obj.getValue() === '9' || obj.getValue() === '3' || obj.getValue() === '10' || obj.getValue() === '11' || obj.getValue() === '13') {
            txtCpn0.show();
            txtCpn1.show();
        } else {
            txtCpn0.hide();
            txtCpn1.hide();
            Ext.getCmp(prototype.idadjnew + '-txtCpn').setValue('');
        }
    },
    onRendererColumnModo: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch ((record.get('A1716MODO'))) {
            case 'S':
                value = 'SALE';
                break;
            case 'F':
                value = 'FLWN';
                break;
            case 'R':
                value = 'RFND';
                break
            case 'J':
                value = 'EXCH';
                break
            case 'M':
                value = 'MEMO';
                break
            case 'I':
                value = 'TAXC';
                break
            default :
                value;
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    validateFields: function () {
        var me = this;
        var selecTypeFit = Ext.getCmp(prototype.idadjnew + '-search-byedt').getValue();
        var opt = '';
        var opt2 = '';
        var txtCia = Ext.getCmp(prototype.idadjnew + '-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idadjnew + '-txtSeq').getValue();
        var txtCupon1 = Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue();
        var txtDate = Ext.getCmp(prototype.idadjnew + '-de-lblDate').getRawValue();
        var CUPON = '';
        var msj = '';
        if (selecTypeFit === '0') {
            msj = 'Select Type Of Adj';
            return msj;
        }
        if (selecTypeFit === '1') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').getValue();
        } else if (selecTypeFit === '2') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').getValue();
        }
        if (opt === '') {
            msj = 'Select of Transation';
            return msj;
        }
        if (txtCia.trim() === '') {
            msj = 'Enter Cia';
            return msj;
        }
        if (txtTicket.trim() === '') {
            msj = 'Enter Ticket';
            return msj;
        }
        if (txtSeq.trim() === '' && txtDate.trim() === '') {
            msj = 'Enter Seq or date';
            return msj;
        }


        if ((selecTypeFit === '1' && (opt === '5' || opt === '6' || opt === '7' || opt === '8' || opt === '9' || opt === '3' || opt === '13')) || selecTypeFit === '2') {
            if (txtCupon1 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }

            if (txtCupon1 !== '') {
                CUPON = txtCupon1;
                opt2 = opt;
            }

        } else {
            opt2 = opt;
        }

        me.paramsDE = {
            strOption: opt2,
            A720AIRLIN: txtCia,
            A720CIA: txtCia,
            A720FORMA: txtTicket.substring(0, 4),
            A720SERIE: txtTicket.substring(4, 10),
            A720SEQ: txtSeq,
            A720CUPON: CUPON,
            A720DATE: ''
        };
        return msj;
    },
    onBtnSearch: function () {
        var me = this;
        var msj = me.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            me.listloadTicket = {};
            Ext.getCmp(prototype.idadjnew + '-win').mask('Please Wait....');
            Ext.Ajax.request({
                url: this.urlWin01 + '/loadTicket',
                method: 'POST',
                timeout: 60000000,
                params: me.paramsDE,
                success: function (response, options) {
                    Ext.getCmp(prototype.idadjnew + '-win').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    //console.log(res);
                    if (res.success) {
                        var listaData = res.data;
                        if (listaData.length > 0) {
                            var item = listaData[0];
                            me.listloadTicket = item;
                            if (item.A720STATUS === '0') {
                                if (Ext.getCmp(prototype.idadjnew + '-de-lblDate').getValue() === '') {
                                    Ext.getCmp(prototype.idadjnew + '-txtSeq').setValue(Ext.String.trim(item.A720SEQ));
                                }
                                if (Ext.String.trim(item.A720FECVTA) !== '') {
                                    var date = Ext.String.trim(item.A720FECVTA).substr(0, 4) + '/' + Ext.String.trim(item.A720FECVTA).substr(4, 2) + '/' + Ext.String.trim(item.A720FECVTA).substr(6, 2);
                                    Ext.getCmp(prototype.idadjnew + '-de-lblDate').setValue(date);
                                }
                                Ext.getCmp(prototype.idadjnew + '-de-lblTtarjeta').setValue(Ext.String.trim(item.A720TTARJ));
                                Ext.getCmp(prototype.idadjnew + '-de-lblNtarjeta').setValue(Ext.String.trim(item.A1531NREF));

                                Ext.getCmp(prototype.idadjnew + '-de-lblRfig').setValue(Ext.String.trim(item.A720RFIC));
                                Ext.getCmp(prototype.idadjnew + '-de-lblRfis').setValue(Ext.String.trim(item.A720MDATC));
                                Ext.getCmp(prototype.idadjnew + '-de-lblVRic').setValue(Ext.String.trim(item.A720NSTOCK));
                                Ext.getCmp(prototype.idadjnew + '-de-lblFsale').setValue(Ext.String.trim(item.A720FECVTA));
                                Ext.getCmp(prototype.idadjnew + '-de-lblIATA').setValue(Ext.String.trim(item.A720NBDA1));

                                Ext.getCmp(prototype.idadjnew + '-de-label-lblAmount').setValue(Ext.util.Format.number(item.A1541VCPVE, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrency').setValue(Ext.String.trim(item.A720CARRN1));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblCommision').setValue(Ext.util.Format.number(item.A1541LCMVE, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommision').setValue(Ext.util.Format.number(item.A1541LSCMV, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblYQ').setValue(Ext.util.Format.number(item.A1541LYQVE, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblFBASIS').setValue(Ext.String.trim(item.A720FBASIS));
                                Ext.getCmp(prototype.idadjnew + '-de-lblCARRIER').setValue(Ext.String.trim(item.A720CARRIER));


                                Ext.getCmp(prototype.idadjnew + '-de-label-lblTC').setValue(Ext.util.Format.number(item.A720TCAMB, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrencyREV').setValue(Ext.String.trim(item.A1541MREVE));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblAmountREV').setValue(Ext.util.Format.number(item.A1541VCPRV, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblCommisionREV').setValue(Ext.util.Format.number(item.A1541RCMVE, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommisionREV').setValue(Ext.util.Format.number(item.A1541RSCMV, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-label-lblYQREV').setValue(Ext.util.Format.number(item.A1541RYQVE, '0,000.00'));
                                Ext.getCmp(prototype.idadjnew + '-de-lblGroup').setValue(Ext.String.trim(item.A720GRUPO));
                                Ext.getCmp(prototype.idadjnew + '-de-lblTdoc').setValue(Ext.String.trim(item.A720TDOC));
                                Ext.getCmp(prototype.idadjnew + '-de-lblIATATrx').setValue(Ext.String.trim(item.A720AGENTE));
                                Ext.getCmp(prototype.idadjnew + '-country').setValue(Ext.String.trim(item.A720PAIVTA));

                                //prototype.idadjnew + '-co-DATE',
                                var cmbTRx = me.paramsDE.strOption;
                                if (cmbTRx === '1' || cmbTRx === '2' || cmbTRx === '3') {
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '1') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA0.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO1.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '2') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO2.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '3') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO3.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '4') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO4.trim());
                                    }
                                } else if (cmbTRx === '5') {
                                    Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA1.trim());
                                    Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA2.trim());
                                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA2.trim());
                                    Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO2.trim());
                                } else if (cmbTRx === '6') {
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '1') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA0.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO1.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '2') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO2.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '3') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO3.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '4') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO4.trim());
                                    }
                                } else if (cmbTRx === '7') {
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '1') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA0.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO1.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '2') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA1.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO2.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '3') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA2.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO3.trim());
                                    }
                                    if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '4') {
                                        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(item.A720RUTA3.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(item.A720RUTA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(item.A720CARRA4.trim());
                                        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(item.A720NVLO4.trim());
                                    }
                                } else if (cmbTRx === '8') {
                                    Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue('');
                                    Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue('');
                                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue('');
                                    Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue('');
                                    Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').setValue('0');
                                    Ext.getCmp(prototype.idadjnew + '-co-AmountRev').setValue('0');
                                }
                                me.onloadAccountig();

                            } else {
                                global.Msg({
                                    msg: res.data.A720MENSAJE
                                });
                            }
                        } else {
                            me.cleandatos();
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    } else {
                        me.cleandatos();
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }

                }
            });

        }


    },
    cleandatos: function () {

        Ext.getCmp(prototype.idadjnew + '-de-lblTtarjeta').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblNtarjeta').setValue('');

        Ext.getCmp(prototype.idadjnew + '-de-lblRfig').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblRfis').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblVRic').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblFsale').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblIATA').setValue('');

        Ext.getCmp(prototype.idadjnew + '-de-label-lblAmount').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrency').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblCommision').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommision').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblYQ').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblFBASIS').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblCARRIER').setValue('');


        Ext.getCmp(prototype.idadjnew + '-de-label-lblTC').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrencyREV').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblAmountREV').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblCommisionREV').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommisionREV').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-label-lblYQREV').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-lblGroup').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblTdoc').setValue('');
        Ext.getCmp(prototype.idadjnew + '-de-lblIATATrx').setValue('');
        Ext.getCmp(prototype.idadjnew + '-country').setValue('');
        Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue('');
        Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue('');
        Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue('');
        Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue('');
        Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-co-AmountRev').setValue('0');
        Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData').getStore().removeAll();
        Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData').getStore().removeAll();


    },
    onloadAccountig: function () {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.idadjnew + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadAccountig',
            method: 'POST',
            timeout: '60000000',
            params: me.paramsDE,
            success: function (response, options) {
                Ext.getCmp(prototype.idadjnew + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData').getStore().removeAll();
                me.onResultLoadAccountig(res.lst_Accounting);
                //Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData').getStore().loadData(res.lst_Accounting);

            }
        });
    },
    onResultLoadAccountig: function (gridDataTktAccountingAC) {
        try {

            /*var fileBean = {};
             for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
             fileBean = gridDataTktAccountingAC[i];
             fileBean.A1530TCAMP = this.beanResultSet01.fileA1530.A1530TCAMP;
             gridDataTktAccountingAC[i] = fileBean;
             }*/
            var typeRow;
            var bolHeader = false, bolRecord = false, bolTotal = false;
            for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                switch (typeRow) {
                    case 'H':
                        if (i === 0) {
                            bolHeader = true;
                            bolRecord = false;
                            bolTotal = false;
                        } else {
                            if (bolHeader || bolRecord || bolTotal) {
                                gridDataTktAccountingAC.splice(i, 1);
                                i--;
                            } else {
                                bolHeader = true;
                                bolRecord = false;
                                bolTotal = false;
                            }
                        }
                        break;
                    case 'R':
                        bolHeader = false;
                        bolRecord = true;
                        bolTotal = false;
                        break;
                    case 'T':
                        if (i === 0) {
                            gridDataTktAccountingAC.splice(i, 1);
                            i--;
                        } else {
                            if (!bolRecord) {
                                gridDataTktAccountingAC.splice(i, 1);
                                i--;
                                if (bolHeader || bolTotal) {
                                    gridDataTktAccountingAC.splice(i, 1);
                                    i--;
                                }
                            }
                        }
                        bolHeader = false;
                        bolRecord = false;
                        bolTotal = false;
                        break;
                    default:
                }
                if (i === gridDataTktAccountingAC.length - 1) {
                    typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                    if (typeRow === 'H') {
                        gridDataTktAccountingAC.splice(i, 1);
                        i--;
                    }
                }
            }
            //console.log(gridDataTktAccountingAC);
            Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData').getStore().loadData(gridDataTktAccountingAC);
        } catch (e) {

        }
    },
    getTypeRow: function (fileBean) {
        var typeRow;
        fileBean.A1716SEQ = fileBean.A1716SEQ.trim();
        fileBean.A1716MODO = fileBean.A1716MODO.trim();
        fileBean.A1716CUENT = fileBean.A1716CUENT.trim();
        if (fileBean.A1716SEQ === '') {
            typeRow = 'H';
        } else if (fileBean.A1716SEQ !== '' && fileBean.A1716SEQ !== '--------') {
            typeRow = 'R';
        } else if (fileBean.A1716MODO === 'TOTAL') {
            typeRow = 'T';
        } else {
            typeRow = '';
        }
        return typeRow;
    },
    onReverseClick: function () {
        var lstNewList = new Array();
        var opflag;
        var items;
        var vlfte = '';
        var DataCombo = '';
        var grid = Ext.getCmp(prototype.idadjnew + '-de-gridOriginalData');
        var grid02 = Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData');
        var regs = grid02.getStore().getCount();
        var cpn = Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue();
        var selecTypeFit = Ext.getCmp(prototype.idadjnew + '-search-byedt').getValue();
        var cmbTYPEUSE = Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').getValue();
        var opt = '';
        if (selecTypeFit === '1') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').getValue();
        } else if (selecTypeFit === '2') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').getValue();
        }
        if (opt !== '') {
            if (opt === '1') {
                DataCombo = 'S';
            } else if (opt === '2' || opt === '6') {
                DataCombo = 'J';
            } else if (opt === '3' || opt === '7') {
                DataCombo = 'R';
            } else if (opt === '5' || opt === '13') {
                DataCombo = 'F';
            } else if (opt === '9') {
                DataCombo = 'C';
            } else if (opt === '8') {
                DataCombo = 'L';
            } else if (opt === '10') {
                DataCombo = 'L';
            } else if (opt === '4') {
                DataCombo = 'M';
            } else {
                DataCombo = 'OP';
            }
        }
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                var beanDatos = {};
                for (var e = 0; e < regs; e++) {
                    if (grid02.getStore().getAt(e).get('A1716SEQT') === row.get('A1716SEQT')) {
                        if (grid02.getStore().getAt(e).get('A1716CUENT') === row.get('A1716CUENT') && grid02.getStore().getAt(e).get('A1716FILE') === row.get('A1716FILE')) {
                            Ext.Msg.alert('.: PRAXIS :.', 'There is already the row selected');
                            return;
                        }

                    }
                }
                if (row.get('A1716MODO') !== DataCombo) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The Transaction must be equal in the Mode ' + row.get('A1716MODO') + ' ' + DataCombo);
                    return;
                }
                if (selecTypeFit === '1') {
                    if (opt === '1' || opt === '2') {
                        beanDatos.A1716CUPON = row.get('A1716CUPON');
                    } else {
                        if (row.get('A1716CUPON') === cpn) {
                            beanDatos.A1716CUPON = row.get('A1716CUPON');
                        } else {
                            Ext.Msg.alert('.: PRAXIS :.', 'All cupon must be equal in the process');
                            return;
                        }
                    }
                } else {
                    if (row.get('A1716CUPON') === cpn) {
                        beanDatos.A1716CUPON = row.get('A1716CUPON');
                    } else {
                        Ext.Msg.alert('.: PRAXIS :.', 'All cupon must be equal in the process');
                        return;
                    }
                }


                beanDatos.A1716MODO = Ext.String.trim(row.get('A1716MODO'));
                beanDatos.A1716FUENT = Ext.String.trim(row.get('A1716FUENT'));
                beanDatos.A1716SUBFU = Ext.String.trim(row.get('A1716SUBFU'));
                beanDatos.A1716CUENT = Ext.String.trim(row.get('A1716CUENT'));
                beanDatos.A1716CUR = Ext.String.trim(row.get('A1716CUR'));
                beanDatos.A1716MARCA = '';
                if (opt === '13' || opt === '5') {
                    if (Ext.String.trim(row.get('A1716CUR')) === '') {
                        beanDatos.A1716CUR = 'USD';
                    }
                }
                if (opt === '8' || opt === '10') {
                    if (Ext.String.trim(row.get('A1716CUR')) === '') {
                        beanDatos.A1716CUR = 'USD';
                    } else {
                        beanDatos.A1716CUR = row.get('CUR2');
                    }
                }
                if (cmbTYPEUSE === 'AA0004') {
                    beanDatos.A1716ACTIV = row.get('A1716ACTIV');
                    beanDatos.A1716PASIV = row.get('A1716PASIV');
                    beanDatos.ACTIV2 = row.get('A1716ACTRV');
                    beanDatos.PASIV2 = row.get('A1716PASRV');
                } else {
                    beanDatos.A1716ACTIV = row.get('A1716PASIV');
                    beanDatos.A1716PASIV = row.get('A1716ACTIV');
                    beanDatos.ACTIV2 = row.get('A1716PASRV');
                    beanDatos.PASIV2 = row.get('A1716ACTRV');
                }
                beanDatos.A1716TITU = Ext.String.trim(row.get('A1716TITU'));
                beanDatos.A1716COPE = Ext.String.trim(row.get('A1716COPE'));
                beanDatos.A1716PROV = Ext.String.trim(row.get('A1716PROV'));
                if (row.get('A1716FILE') === 'G') {
                    beanDatos.A1716FILE = 'GL';
                } else if (row.get('A1716FILE') === 'A') {
                    beanDatos.A1716FILE = 'AP';
                } else if (row.get('A1716FILE') === 'R') {
                    beanDatos.A1716FILE = 'AR';
                } else {
                    beanDatos.A1716FILE = row.get('A1716FILE');
                }

                beanDatos.A1716FUENT = Ext.String.trim(row.get('A1716FUENT'));
                beanDatos.A1716FP = Ext.String.trim(row.get('A1716FP'));
                beanDatos.CONP1 = Ext.String.trim(row.get('A1716FP'));
                beanDatos.CONP3 = Ext.String.trim(row.get('A1716ORIG'));
                beanDatos.A1716TIDOC = Ext.String.trim(row.get('A1716TIDOC'));
                beanDatos.ORAC = Ext.String.trim(row.get('A1716TIDOC'));
                this.numaero = Ext.String.trim(row.get('A1716TIDOC'));
                this.SET = Ext.String.trim(row.get('A1716SEQT'));
                beanDatos.A1716ORIG = Ext.String.trim(row.get('A1716ORIG'));
                beanDatos.A1716CLIEN = Ext.String.trim(row.get('A1716CLIEN'));
                beanDatos.A1716DIREC = Ext.String.trim(row.get('A1716DIREC'));
                beanDatos.A1716SEQT = Ext.String.trim(row.get('A1716SEQT'));
                beanDatos.A1530POLIZA = Ext.String.trim(row.get('A1530POLIZA'));
                beanDatos.LIB1 = Ext.String.trim(row.get('A1530POLIZA'));
                if (row.get('A1716MARCA')) {
                    if (opt === '1' || opt === '2' || opt === '3' || opt === '4' || opt === '6' || opt === '7' || opt === '9') {
                        // beanDatos.A1716MARCA = 'P';
                        beanDatos.A1716MARCA = 'PTE';
                    } else {
                        //beanDatos.A1716MARCA = 'X';
                        beanDatos.A1716MARCA = 'PTE';
                    }
                }
                if (row.get('A1716FILE') === 'G' || row.get('A1716FILE') === 'A' || row.get('A1716FILE') === 'A') {
                    if (Ext.String.trim(row.get('A1716TITU')) === 'CUENTA CONTROL INGRESOS PRAXIS') {
                        if (opt === '1' || opt === '2' || opt === '3' || opt === '4' || opt === '6' || opt === '7' || opt === '9') {
                            // beanDatos.A1716MARCA = 'P';
                            beanDatos.A1716MARCA = 'PTE';
                        } else {
                            //beanDatos.A1716MARCA = 'X';
                            beanDatos.A1716MARCA = 'PTE';
                        }
                    }
                }

                beanDatos.LIB1CIA = '';
                beanDatos.CTAC = '';
                beanDatos.TITUC = '';
                beanDatos.LIB1C = '';
                beanDatos.CTAP = '';
                beanDatos.TITUP = '';
                beanDatos.LIB1P = '';
                beanDatos.CTAPC = '';
                beanDatos.TITUPC = '';
                beanDatos.LIB1PC = '';
                beanDatos.CTAPAR = '';
                beanDatos.TITUPAR = '';
                beanDatos.LIB1PAR = '';
                beanDatos.CLIENTAR = '';
                beanDatos.DIRECCAR = '';
                beanDatos.ORACAR = '';
                beanDatos.COMB = Ext.getCmp(prototype.idadjnew + '-de-label-lblTC').getValue();
                grid02.getStore().add(beanDatos);

            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    OnDatoRemove: function (grid, rowIndex, colIndex) {
        global.Msg({
            msg: 'Are you sure to delete the row ?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        });
    },
    onAddataClick: function () {
        var me = this;
        var selecTypeFit = Ext.getCmp(prototype.idadjnew + '-search-byedt').getValue();
        var opt = '';
        if (selecTypeFit === '1') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').getValue();
        } else if (selecTypeFit === '2') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').getValue();
        }

        if (Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').getValue() === '') {
            Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').focus();
            global.Msg({msg: 'Required Field, enter the Ticket'});
            return;
        }
        if (selecTypeFit === '') {
            Ext.getCmp(prototype.idadjnew + '-search-byedt').focus();
            global.Msg({msg: 'Required Field, Select Of Search By'});
            return;
        }
        if (opt === '') {
            global.Msg({msg: 'Required Field, Select Of Transaction'});
            return;
        }
        if (opt === '5' || opt === '13') {
            if (Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue() === '') {
                Ext.getCmp(prototype.idadjnew + '-txtCpn').focus();
                global.Msg({msg: 'Required Field, enter the Cupon'});
                return;
            }
        }
        var ttarjeta = '';
        var Ntarjeta = '';
        var Rfic = '';
        var Rfis = '';
        var VRic = '';
        var Fvta = '';
        if (Ext.getCmp(prototype.idadjnew + '-co-lblTtarjeta').getValue() !== '') {
            ttarjeta = Ext.getCmp(prototype.idadjnew + '-co-lblTtarjeta').getValue();
        } else {
            ttarjeta = Ext.getCmp(prototype.idadjnew + '-de-lblTtarjeta').getValue();
        }
        if (Ext.getCmp(prototype.idadjnew + '-co-lblNtarjeta').getValue() !== '') {
            Ntarjeta = Ext.getCmp(prototype.idadjnew + '-co-lblNtarjeta').getValue();
        } else {
            Ntarjeta = Ext.getCmp(prototype.idadjnew + '-de-lblNtarjeta').getValue();
        }
        if (Ext.getCmp(prototype.idadjnew + '-co-lblRfig').getValue() !== '') {
            Rfic = Ext.getCmp(prototype.idadjnew + '-co-lblRfig').getValue();
        } else {
            Rfic = Ext.getCmp(prototype.idadjnew + '-de-lblRfig').getValue();
        }
        if (Ext.getCmp(prototype.idadjnew + '-co-lblRfis').getValue() !== '') {
            Rfis = Ext.getCmp(prototype.idadjnew + '-co-lblRfis').getValue();
        } else {
            Rfis = Ext.getCmp(prototype.idadjnew + '-de-lblRfis').getValue();
        }
        if (Ext.getCmp(prototype.idadjnew + '-co-lblVRic').getValue() !== '') {
            VRic = Ext.getCmp(prototype.idadjnew + '-co-lblVRic').getValue();
        } else {
            VRic = Ext.getCmp(prototype.idadjnew + '-de-lblVRic').getValue();
        }
        if (Ext.getCmp(prototype.idadjnew + '-co-lblFsale').getValue() !== '') {
            Fvta = Ext.getCmp(prototype.idadjnew + '-co-lblFsale').getValue();
        } else {
            Fvta = Ext.getCmp(prototype.idadjnew + '-de-lblFsale').getValue();
        }

        me.listAddNuewdatos.selecTypeFit = selecTypeFit;
        me.listAddNuewdatos.opt = opt;
        me.listAddNuewdatos.txtCia = Ext.getCmp(prototype.idadjnew + '-txtCia').getValue();
        me.listAddNuewdatos.txtFrmaSerie = Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').getValue();
        me.listAddNuewdatos.txtSeq = Ext.getCmp(prototype.idadjnew + '-txtSeq').getValue();
        me.listAddNuewdatos.Nuemro = me.numaero;
        me.listAddNuewdatos.CPN = Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue();
        me.listAddNuewdatos.ttarjeta = ttarjeta;
        me.listAddNuewdatos.Ntarjeta = Ntarjeta;
        me.listAddNuewdatos.Rfic = Rfic;
        me.listAddNuewdatos.Rfis = Rfis;
        me.listAddNuewdatos.VRic = VRic;
        me.listAddNuewdatos.Fsale = Fvta;
        me.listAddNuewdatos.Tdoc = Ext.getCmp(prototype.idadjnew + '-de-lblTdoc').getValue();
        me.listAddNuewdatos.TFor = me.listloadTicket.A720TFORMA;
        me.listAddNuewdatos.SUBFU = me.listloadTicket.A1530SFUEN;
        me.listAddNuewdatos.FUENT = me.listloadTicket.A1530FUENT;
        me.listAddNuewdatos.MdaLoc = me.listloadTicket.A720CARRN1;
        me.listAddNuewdatos.TCAMB = me.listloadTicket.A720TCAMB;
        me.listAddNuewdatos.IATA = me.listloadTicket.A720AGENTE;
        me.listAddNuewdatos.CARRIER = me.listloadTicket.A720CARRIER;
        me.listAddNuewdatos.SET = me.SET;
        //listloadTicket: {},
        //listAddNuewdatos: {},

        var win = new Ext.Praxis.view.sales.ADJAccountingForm.DataAddEntryNew({
            params: {
                params: me.listloadTicket,
                listAddNuewdatos: me.listAddNuewdatos
            }
        });
        win.show();
    },

    onLoadDataLE: function () {
        var me = this;
        var CmbTtrax = '';
        rec = me.view.params.rec;
        Ext.getCmp(prototype.idadjnew + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadCargarDatos',
            method: 'POST',
            timeout: 60000000,
            params: {
                A2024CODER: rec.data.A2024CODER,
                A2024CUPON: rec.data.A2024CUPON,
                A2024SEQ: rec.data.A2024SEQ,
                A2024CORRL: rec.data.A2024CORRL
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idadjnew + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idadjnew + '-de-gridDataDetail').getStore().removeAll();
                Ext.getCmp(prototype.idadjnew + '-de-gridDataDetail').getStore().loadData(res.data);
                if (res.data.length > 0) {
                    Ext.getCmp(prototype.idadjnew + '-search-byedt').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtCia').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtSeq').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtCpn').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtCpn0').show();
                    Ext.getCmp(prototype.idadjnew + '-de-lblDate').hide();
                    Ext.getCmp(prototype.idadjnew + '-de-btnSearch').hide();
                    Ext.getCmp(prototype.idadjnew + '-de-btnClear').hide();
                    Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').show();
                    //
                    Ext.getCmp(prototype.idadjnew + '-search-byedt').setValue(Ext.String.trim(res.data[0].A1541TTRANS));
                    Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').setValue(Ext.String.trim(res.data[0].A2024TTRAX));
                    Ext.getCmp(prototype.idadjnew + '-txtCia').setValue(Ext.String.trim(rec.data.A2024CIA));
                    Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').setValue(Ext.String.trim(rec.data.A2024CODER));
                    Ext.getCmp(prototype.idadjnew + '-txtSeq').setValue(Ext.String.trim(rec.data.A2024SEQ));
                    Ext.getCmp(prototype.idadjnew + '-txtCpn').setValue(Ext.String.trim(rec.data.A2024CUPON));
                    //
                    Ext.getCmp(prototype.idadjnew + '-co-OriginalData1').hide();
                    Ext.getCmp(prototype.idadjnew + '-co-OriginalData2').hide();
                    Ext.getCmp(prototype.idadjnew + '-co-OriginalData3').hide();
                    Ext.getCmp(prototype.idadjnew + '-co-lblTtarjeta').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblNtarjeta').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblRfig').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblRfis').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblVRic').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblFsale').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblIATA').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblAmount').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrency').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCommision').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommision').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblYQ').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblFBASIS').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblTC').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrencyREV').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblAmountREV').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCommisionREV').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommisionREV').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblYQREV').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-TKTREFE').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-TKTSEQ').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtAffectTNU').setReadOnly(true);

                    Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-co-AmountRev').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtAffectation').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-country').setReadOnly(true);
                    Ext.getCmp(prototype.idadjnew + '-txtCrtBy').setReadOnly(true);

                    //
                    Ext.getCmp(prototype.idadjnew + '-co-lblTtarjeta').setValue(Ext.String.trim(res.data[0].A2024TTARJ));
                    Ext.getCmp(prototype.idadjnew + '-co-lblNtarjeta').setValue(Ext.String.trim(res.data[0].A2024NTARJ));
                    Ext.getCmp(prototype.idadjnew + '-co-lblRfig').setValue(Ext.String.trim(res.data[0].A2024RFIC));
                    Ext.getCmp(prototype.idadjnew + '-co-lblRfis').setValue(Ext.String.trim(res.data[0].A2024RFIS));
                    Ext.getCmp(prototype.idadjnew + '-co-lblVRic').setValue(Ext.String.trim(res.data[0].A2024VRICOC));
                    Ext.getCmp(prototype.idadjnew + '-co-lblFsale').setValue(Ext.String.trim(res.data[0].A2024FECVTA));
                    Ext.getCmp(prototype.idadjnew + '-co-lblIATA').setValue(Ext.String.trim(rec.A2024AGENT));
                    //
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblAmount').setValue(Ext.util.Format.number(res.data[0].A1541VCPVE, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrency').setValue(Ext.String.trim(res.data[0].A1541MDAVE));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCommision').setValue(Ext.util.Format.number(res.data[0].A1541LCMVE, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommision').setValue(Ext.util.Format.number(res.data[0].A1541LSCMV, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblYQ').setValue(Ext.util.Format.number(res.data[0].A1541LYQVE, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblFBASIS').setValue(Ext.String.trim(res.data[0].A1541FBORI1));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.idadjnew + '-co-label-lblFBASIS',
                        html: '' + Ext.String.trim(res.data[0].A1541FBORI1)
                    });
                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER').setValue(Ext.String.trim(res.data[0].A1541CARR));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblTC').setValue(Ext.util.Format.number(res.data[0].A1541TCRVE, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrencyREV').setValue(Ext.String.trim(res.data[0].A1541MREVE));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblAmountREV').setValue(Ext.util.Format.number(res.data[0].A1541VCPRV, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblCommisionREV').setValue(Ext.util.Format.number(res.data[0].A1541RCMVE, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommisionREV').setValue(Ext.util.Format.number(res.data[0].A1541RSCMV, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-label-lblYQREV').setValue(Ext.util.Format.number(res.data[0].A1541RYQVE, '0,000.00'));

                    Ext.getCmp(prototype.idadjnew + '-de-lblGroup').setValue(Ext.String.trim(res.data[0].GRUPO));
                    Ext.getCmp(prototype.idadjnew + '-de-lblTdoc').setValue(Ext.String.trim(res.data[0].A2024TDOC));
                    Ext.getCmp(prototype.idadjnew + '-de-lblIATATrx').setValue(Ext.String.trim(res.data[0].A2024AGENT));
                    Ext.getCmp(prototype.idadjnew + '-co-TKTREFE').setValue(Ext.String.trim(res.data[0].A1541TKTASOC));
                    Ext.getCmp(prototype.idadjnew + '-co-TKTSEQ').setValue(Ext.String.trim(res.data[0].A1541ASOCSEQ));
                    Ext.getCmp(prototype.idadjnew + '-txtAffectTNU').setValue(false);
                    if (Ext.String.trim(res.data[0].ESTA_TNU) !== '') {
                        Ext.getCmp(prototype.idadjnew + '-txtAffectTNU').setValue(true);
                    }
                    if (Ext.String.trim(res.data[0].A2024ESTTRX) !== '') {
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').show();
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS').show();
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').setValue(Ext.String.trim(res.data[0].A2024ESTTRX));
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS').setValue(Ext.String.trim(res.data[0].VP_TypeVoid));
                    } else {
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').hide();
                        Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS').hide();
                    }

                    Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').setValue(Ext.String.trim(res.data[0].A1541CDEPART));
                    Ext.getCmp(prototype.idadjnew + '-co-DESTINO').setValue(Ext.String.trim(res.data[0].A1541CARRIVA));
                    Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').setValue(Ext.String.trim(res.data[0].A1541NFLIGHT));
                    Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').setValue(Ext.String.trim(res.data[0].A1541CARR));
                    Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').setValue(Ext.util.Format.number(res.data[0].A1541AMOUNTLOC, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-co-AmountRev').setValue(Ext.util.Format.number(res.data[0].A1541AMOUNTRV, '0,000.00'));
                    Ext.getCmp(prototype.idadjnew + '-txtAffectation').setValue(Ext.String.trim(rec.data.A2024IATAUSU));
                    Ext.getCmp(prototype.idadjnew + '-country').setValue(Ext.String.trim(res.data[0].A2024PSVTA));
                    Ext.getCmp(prototype.idadjnew + '-txtCrtBy').setValue(Ext.String.trim(res.data[0].A1541REVIS));
                    Ext.getCmp(prototype.idadjnew + '-txaReference1').setValue(Ext.String.trim(res.data[0].A2024DESCRIP));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.idadjnew + '-txaReference1',
                        html: '' + Ext.String.trim(res.data[0].A2024DESCRIP)
                    });

                    if (Ext.String.trim(rec.data.A2024ESTADO) === 'AN') {
                        var form = Ext.getCmp(prototype.idadjnew + '-form');
                        form.update('');
                        var size = form.getSize();
                        form.mask('<div id="mask-watermark"></div>');
                        var id = Ext.get('mask-watermark').parent().parent().parent().parent().id;
                        Ext.get(id).update('');
                        Ext.get(id).setStyle('background-color', 'transparent');
                        Ext.get(id).setStyle('background', 'url(resources/img/icon/void.png) no-repeat');
                        Ext.get(id).setStyle('background-size', size.width + 'px ' + size.height + 'px');
                        Ext.get(id).setStyle('opacity', '0.3');
                        Ext.get(id).setStyle('margin', '60px 0px 30px 0px');
                    }





                } else {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }



            }
        });

    },
    onLoadData: function () {
        var me = this;
        rec = me.view.params.rec;
        ////
        Ext.getCmp(prototype.idadjnew + '-txttidoc').setValue(rec.get('A3648TIDOC'));
        Ext.getCmp(prototype.idadjnew + '-txtfolio').setValue(String(this.view.params.folio));
        Ext.getCmp(prototype.idadjnew + '-txtRfndFee').setValue(rec.get('A3648FEE'));
        Ext.getCmp(prototype.idadjnew + '-txttkt').setValue(rec.get('A3648TKT'));
        Ext.getCmp(prototype.idadjnew + '-txtcpn').setValue(rec.get('A3648CUPON'));
        Ext.getCmp(prototype.idadjnew + '-txttrnc').setValue(rec.get('A3648TRNCU'));
        Ext.getCmp(prototype.idadjnew + '-txtIssdate').setValue(rec.get('A3648FVNTA'));
        Ext.getCmp(prototype.idadjnew + '-txtpnr').setValue(rec.get('A3648PNR'));
        Ext.getCmp(prototype.idadjnew + '-txtpax').setValue(rec.get('A3648PAX'));
        Ext.getCmp(prototype.idadjnew + '-txtEndorse').setValue(rec.get('A3648ENDOR'));
        Ext.getCmp(prototype.idadjnew + '-txtrefundable').setValue(rec.get('A3648RFNDB'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idadjnew + '-txtEndorse',
            html: '' + Ext.String.trim(rec.get('A3648ENDOR'))
        });
        Ext.getCmp(prototype.idadjnew + '-txtFareCal').setValue(rec.get('A3648FAREC'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idadjnew + '-txtFareCal',
            html: '' + Ext.String.trim(rec.get('A3648FAREC'))
        });
        Ext.getCmp(prototype.idadjnew + '-txtiata').setValue(rec.get('A3648IATA'));
        Ext.getCmp(prototype.idadjnew + '-txtmda').setValue(rec.get('A3648MDA'));
        Ext.getCmp(prototype.idadjnew + '-txtCOUNTRY').setValue(rec.get('A3648PAIVTA'));
        Ext.getCmp(prototype.idadjnew + '-txtpreme').setValue(rec.get('A3648PREME'));
        Ext.getCmp(prototype.idadjnew + '-txtCrrl').setValue(rec.get('A3648CORRL'));
        // suma
        Ext.getCmp(prototype.idadjnew + '-txtFare').setValue(Ext.util.Format.number(rec.get('A3648TARIF'), '0,000.00'));
        Ext.getCmp(prototype.idadjnew + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A3648TTAX'), '0,000.00'));
        Ext.getCmp(prototype.idadjnew + '-txtCommission').setValue(Ext.util.Format.number(rec.get('A3648COMIS'), '0,000.00'));
        Ext.getCmp(prototype.idadjnew + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A3648TOTAL'), '0,000.00'));
        //diferenciaas
        //A3648CPN1,A3648CPN2,A3648CPN3,A3648CPN4,A3648TRFND,A3648TARID,A3648TTAXD,A3648COMID,A3648SCOMD,A3648TOTAD,
        if (rec.get('A3648TARID') !== 0) {
            Ext.getCmp(prototype.idadjnew + '-txtTotalFareAm').setValue(Ext.util.Format.number(rec.get('A3648TARID'), '0,000.00'));
            Ext.getCmp(prototype.idadjnew + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAXD'), '0,000.00'));
            Ext.getCmp(prototype.idadjnew + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAD'), '0,000.00'));
        } else {
            Ext.getCmp(prototype.idadjnew + '-txtTotalFareAm').setValue(Ext.util.Format.number(rec.get('A3648TARIF'), '0,000.00'));
            Ext.getCmp(prototype.idadjnew + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAX'), '0,000.00'));
            Ext.getCmp(prototype.idadjnew + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAL'), '0,000.00'));
        }


        Ext.getCmp(prototype.idadjnew + '-txtTotalFareAm').setReadOnly(false);
        Ext.getCmp(prototype.idadjnew + '-txtTotalTaxAm').setReadOnly(true);
        Ext.getCmp(prototype.idadjnew + '-txtTotalram').setReadOnly(true);
        var gridRazonesTkt = Ext.getCmp(prototype.idadjnew + '-gridRazonesTkt');
        gridRazonesTkt.on('beforeedit', function (event, e) {
            if (e.record.get('A3649CODE') === '00001' && e.record.get('A3649TYPE') === 'AM') {
                return true;
            } else {
                return false;
            }

        }, gridRazonesTkt);
    },
    cargaDatos: function (rec) {
        var me = this;
        me.beanINI.IN_OPTION = '1';
        me.beanINI.IN_SEQ = '';
        me.beanINI.IN_CNXPA = rec.get('A3537CNXPA');
        if (Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'RFND') {
            me.beanINI.IN_OPTION = '3';
            me.beanINI.IN_CNXPA = rec.get('A3537NMEMO');
        }
        if (Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'TKT' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'EXCH' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'EMD') {
            me.beanINI.IN_OPTION = '2';
            me.beanINI.IN_SEQ = '00';
            me.beanINI.IN_CNXPA = rec.get('A3537NMEMO');
        }
        me.beanINI.IN_CIA = rec.get('A3537CCUST');
        me.beanINI.IN_PREME = rec.get('A3537PREME');
        Ext.getCmp(prototype.idadjnew + '-win').mask('Please Wait....');
        /* cargar data*/
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchPostbillingDetail/',
            method: 'POST',
            timeout: '300000',
            params: me.beanINI,
            success: function (response, options) {
                Ext.getCmp(prototype.idadjnew + '-win').unmask();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.idadjnew + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.idadjnew + '-gridRazon').getStore().loadData(res.lst_DispuHisto);
                Ext.getCmp(prototype.idadjnew + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.idadjnew + '-gridTKT').getStore().loadData(res.lst_Tkts);
                Ext.getCmp(prototype.idadjnew + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.idadjnew + '-gridDispuRazon').getStore().loadData(res.lst_DispuPostbi);
            }
        });
        /*finde la carga*/
    },

    setStoresFilters: function () {
        var ComboEstatus = Ext.getCmp(prototype.idadjnew + '-ComboStatus');
        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"}
            ]
        }));
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    CleanFields: function () {
        /* Ext.getCmp(prototype.idadjnew + '-gridRazon').getStore().removeAll();
         Ext.getCmp(prototype.idadjnew + '-gridTKT').getStore().removeAll();
         Ext.getCmp(prototype.idadjnew + '-gridDispuRazon').getStore().removeAll();
         Ext.getCmp(prototype.idadjnew + '-nmemo').setValue('');
         Ext.getCmp(prototype.idadjnew + '-ComboStatus').setValue('');
         Ext.getCmp(prototype.idadjnew + '-disputable').setValue('');
         Ext.getCmp(prototype.idadjnew + '-Argument').setValue('');
         Ext.getCmp(prototype.idadjnew + '-File').setValue('');
         Ext.getCmp(prototype.idadjnew + '-File2').setValue('');
         Ext.getCmp(prototype.idadjnew + '-File3').setValue('');
         Ext.getCmp(prototype.idadjnew + '-trnc').setValue('');
         Ext.getCmp(prototype.idadjnew + '-disputable').setValue('0.00');
         Ext.getCmp(prototype.idadjnew + '-dias').setValue('');
         Ext.getCmp(prototype.idadjnew + '-mda').setValue('');
         Ext.getCmp(prototype.idadjnew + '-pbda').setValue('');
         Ext.getCmp(prototype.idadjnew + '-PBDate').setValue('');
         Ext.getCmp(prototype.idadjnew + '-ResoDate').setValue('');
         Ext.getCmp(prototype.idadjnew + '-txtStatus').setValue('');
         Ext.getCmp(prototype.idadjnew + '-pbdadif').setValue('0.00');*/


    },
    validaRequiredFields: function () {
        var bvalida = true;

        var vl_txtAffectation = Ext.getCmp(prototype.idadjnew + '-txtAffectation').getValue();
        var vl_txaReference = Ext.getCmp(prototype.idadjnew + '-txaReference').getValue();
        var vl_searchbyedt = Ext.getCmp(prototype.idadjnew + '-search-byedt').getValue();
        var vl_txtCpn = Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue();
        var vl_country = Ext.getCmp(prototype.idadjnew + '-country').getValue();
        var vl_TKTREFE = Ext.getCmp(prototype.idadjnew + '-co-TKTREFE').getValue();
        var vl_TKTSEQ = Ext.getCmp(prototype.idadjnew + '-co-TKTSEQ').getValue();
        var txtDateSale = Ext.getCmp(prototype.idadjnew + '-de-lblDate').getRawValue();
        var txtCARRIER = Ext.getCmp(prototype.idadjnew + '-de-lblCARRIER').getValue();
        var cmbTYPEUSE = Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').getValue();
        var cmbTYUSEASS = Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').getValue();
        var ORIGEN = Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').getValue();
        var DESTINO = Ext.getCmp(prototype.idadjnew + '-co-DESTINO').getValue();
        var FLIGHT = Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').getValue();
        var lblCARRIER2 = Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').getValue();
        var AmountLoc = Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').getValue().replace(',', '');
        var AmountRev = Ext.getCmp(prototype.idadjnew + '-co-AmountRev').getValue().replace(',', '');
        var typeAP = '';
        var typeAR = '';
        var typeSubfu = '';
        var vl_TOTALACTIV = 0;
        var vl_TOTALPASIV = 0;
        var vl_TOTALACTIV2 = 0;
        var vl_TOTALPASIV2 = 0;
        var vl_MontoLoDebit2 = 0;
        var vl_MontoLoCredit2 = 0;
        var vl_MontoRevDebit2 = 0;
        var vl_MontoRevCredit2 = 0;
        var vl_MontoLoDebit4 = 0;
        var vl_MontoLoCredit4 = 0;
        var vl_MontoRevDebit4 = 0;
        var vl_MontoRevCredit4 = 0;
        var vl_MontoLoDebit3 = 0;
        var vl_MontoLoCredit3 = 0;
        var vl_MontoRevDebit3 = 0;
        var vl_MontoRevCredit3 = 0;
        var vl_MontoLoDebit5 = 0;
        var vl_MontoLoCredit5 = 0;
        var vl_MontoRevDebit5 = 0;
        var vl_MontoRevCredit5 = 0;
        var TipoFuente = '';
        var vl_A1716SEQT = '';
        var vl_A1716CUR = '';
        var VL_A1716MARCA = '';
        var VL_A1716MARCAAP = '';
        var vl_netoLoc = 0;
        var vl_netoRev = 0;
        var existeAR = '';
        var existeAP = '';
        var vl_A1716CUPON = '';

        var grid01 = Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData');
        var regs = grid01.getStore().getCount();
        var opt = '';
        if (vl_searchbyedt === '1') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').getValue();
        } else if (vl_searchbyedt === '2') {
            opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').getValue();
        }
        if (vl_searchbyedt === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select type Of Adj');
            bvalida = false;
            return;
        }
        if (txtFrmaSerie === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Of Ticket');
            bvalida = false;
            return;
        }
        if (opt === "13" || opt === "5") {
            if (txtCARRIER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Carrier');
                bvalida = false;
                return;
            }
        }
        if (vl_searchbyedt === '2') {
            if (cmbTYPEUSE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Use Reason');
                bvalida = false;
                return;
            }
            if (cmbTYUSEASS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Use Annulment');
                bvalida = false;
                return;
            }
            if (ORIGEN === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Origen del use');
                bvalida = false;
                return;
            }
            if (DESTINO === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Destino del use');
                bvalida = false;
                return;
            }
            if (FLIGHT === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Flight del use');
                bvalida = false;
                return;
            }
            if (lblCARRIER2 === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Carrier del use');
                bvalida = false;
                return;
            }
            if (parseFloat(AmountLoc) === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Amount Local del use');
                bvalida = false;
                return;
            }
            if (parseFloat(AmountRev) === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Amount Rev del use');
                bvalida = false;
                return;
            }
        }

        if (txtDateSale === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the date of sale or the date of use');
            bvalida = false;
            return;
        }
        if (vl_txtAffectation === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter IATA Affectation');
            bvalida = false;
            return;
        }
        if (vl_txaReference === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Justification');
            bvalida = false;
            return;
        }
        if (Ext.String.trim(vl_txaReference).length > 255) {
            Ext.Msg.alert('.: PRAXIS :.', 'The Justification must be 255 characters ');
            bvalida = false;
            return;
        }
        if (opt === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select transation');
            bvalida = false;
            return;
        }

        if (opt === "13" || opt === "5" || opt === "6" || opt === "8" || opt === "9" || opt === "11" || opt === "10" || opt === "11" || opt === "7" || opt === "3") {
            if (vl_txtCpn === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter One Cupon');
                bvalida = false;
                return;
            }
        }
        if (opt === "8" && opt === "10") {
            if (vl_country === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter One Country');
                bvalida = false;
                return;
            }
        }

        if (opt === "6") {
            if (vl_TKTREFE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'You must enter the reference TKT');
                bvalida = false;
                return;
            }
            if (vl_TKTSEQ === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'You must enter the reference date sequence TKT');
                bvalida = false;
                return;
            }
        }


        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter at least one record to save');
            bvalida = false;
        } else {
            for (var o = 0; o < regs; o++) {

                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AR' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'R') {
                    existeAR = '1';
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716MARCA')) !== '') {
                        VL_A1716MARCA = 'P';
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716MARCA')) !== 'PTE') {
                            Ext.Msg.alert('.: PRAXIS :.', 'The PTE mark is wrongly entered ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                            bvalida = false;
                            return;
                        }

                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUPON')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'Must enter the Cupon of ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716SUBFU')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'Must enter the SUB-SRC of ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('ORAC')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'For files ar (lib1), the pte account must be marked');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CLIEN')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'Must enter the client of AR ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                        bvalida = false;
                        return;
                    }


                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AP' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'A') {
                    existeAP = '1';
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716MARCA')) !== '') {
                        VL_A1716MARCAAP = 'P';
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716PROV')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'Must enter the provider of AP ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                        bvalida = false;
                        return;
                    }

                }

                if (o === 0) {
                    TipoFuente = Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT'));
                    vl_A1716SEQT = Ext.String.trim(grid01.getStore().getAt(o).get('A1716SEQT'));
                    vl_A1716CUR = Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUR'));
                    vl_A1716CUPON = Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUPON'));
                } else {
                    if (TipoFuente !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The field src source is different');
                        bvalida = false;
                        return;
                    }
                    if (vl_A1716CUR !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUR'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The field curr currency is different');
                        bvalida = false;
                        return;
                    }
                    if (vl_A1716SEQT !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716SEQT'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The field seqt is different');
                        bvalida = false;
                        return;
                    }
                    if (vl_A1716CUPON !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUPON'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The field Cupons is different');
                        bvalida = false;
                        return;
                    }
                }
                var Valor_A1716ACTIV = 0;
                var Valor_A1716PASIV = 0;
                var Valor_ACTIV2 = 0;
                var Valor_PASIV2 = 0;
                var Valor_A1716ACTIV = (grid01.getStore().getAt(o).get('A1716ACTIV') === null || grid01.getStore().getAt(o).get('A1716ACTIV') === undefined || grid01.getStore().getAt(o).get('A1716ACTIV') === "") ? 0 : grid01.getStore().getAt(o).get('A1716ACTIV');
                var Valor_A1716PASIV = (grid01.getStore().getAt(o).get('A1716PASIV') === null || grid01.getStore().getAt(o).get('A1716PASIV') === undefined || grid01.getStore().getAt(o).get('A1716PASIV') === "") ? 0 : grid01.getStore().getAt(o).get('A1716PASIV');
                var Valor_ACTIV2 = (grid01.getStore().getAt(o).get('ACTIV2') === null || grid01.getStore().getAt(o).get('ACTIV2') === undefined || grid01.getStore().getAt(o).get('ACTIV2') === "") ? 0 : grid01.getStore().getAt(o).get('ACTIV2');
                var Valor_PASIV2 = (grid01.getStore().getAt(o).get('PASIV2') === null || grid01.getStore().getAt(o).get('PASIV2') === undefined || grid01.getStore().getAt(o).get('PASIV2') === "") ? 0 : grid01.getStore().getAt(o).get('PASIV2');

                vl_TOTALACTIV += parseFloat(Valor_A1716ACTIV);
                vl_TOTALPASIV += parseFloat(Valor_A1716PASIV);
                vl_TOTALACTIV2 += parseFloat(Valor_ACTIV2);
                vl_TOTALPASIV2 += parseFloat(Valor_PASIV2);
                /*vl_TOTALACTIV = (vl_TOTALACTIV + parseFloat(grid01.getStore().getAt(o).get('A1716ACTIV').toFixed(2)));
                 vl_TOTALPASIV = (vl_TOTALPASIV + parseFloat(grid01.getStore().getAt(o).get('A1716PASIV').toFixed(2)));
                 vl_TOTALACTIV2 = (vl_TOTALACTIV2 + parseFloat(grid01.getStore().getAt(o).get('ACTIV2').toFixed(2)));
                 vl_TOTALPASIV2 = (vl_TOTALPASIV2 + parseFloat(grid01.getStore().getAt(o).get('PASIV2').toFixed(2)));
                 */
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter a correct accounting account');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).length !== 36) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The account number must be 36 characters' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')));
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')).length > 30) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The concept number must be 30 characters ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                    bvalida = false;
                    return;
                }

                if (opt === "13" || opt === "5") {
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'AE' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'CM' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'PP') {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter a correct airline number ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AP' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'A') {
                        if (('114113830' !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) + "" + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28)) && ('213124704' !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) + "" + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28))) {
                            Ext.Msg.alert('.: PRAXIS :.', 'The account must is incorrect AP' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + " Must be 1141-13830 or 2131-24704 ");
                            bvalida = false;
                            return;
                        }
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AR' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'R') {
                        if (('114113801' !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) + "" + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28)) && ('114113833' !== Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) + "" + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28))) {
                            Ext.Msg.alert('.: PRAXIS :.', 'The account must is incorrect AR' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + " Must be 1141-13801 or 1141-13833 ");
                            bvalida = false;
                            return;
                        }
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716SUBFU')).length === 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter a correct Carrier' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')));
                        bvalida = false;
                        return;
                    } else {
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716SUBFU')) === '5D') {
                            typeSubfu = '5D';
                            if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AP' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'A') {
                                typeAP = '1';
                                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716PROV')) === '') {
                                    Ext.Msg.alert('.: PRAXIS :.', 'Must enter the provider of AP' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                                    bvalida = false;
                                    return;
                                }
                                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716PROV')) !== '7181') {
                                    Ext.Msg.alert('.: PRAXIS :.', 'The provider entered for AP is incorrect ' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')) + ' Must be 7181');
                                    bvalida = false;
                                    return;
                                }

                            }
                            if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'AR' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === 'R') {
                                typeAR = '1';
                                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CLIEN')) === '') {
                                    Ext.Msg.alert('.: PRAXIS :.', 'Must enter the Client of AR' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')));
                                    bvalida = false;
                                    return;
                                }
                                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CLIEN')) !== '13939' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716CLIEN')) !== '12383') {
                                    Ext.Msg.alert('.: PRAXIS :.', 'The Client entered for AR is incorrect ' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')) + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716TITU')) + ' Must be 13939 OR 12383');
                                    bvalida = false;
                                    return;
                                }

                            }
                        }

                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(0, 2) === '02') {
                        vl_MontoLoDebit2 = (vl_MontoLoDebit2 + parseFloat(grid01.getStore().getAt(o).get('A1716ACTIV')));
                        vl_MontoLoCredit2 = (vl_MontoLoCredit2 + parseFloat(grid01.getStore().getAt(o).get('A1716PASIV')));
                        vl_MontoRevDebit2 = (vl_MontoRevDebit2 + parseFloat(grid01.getStore().getAt(o).get('ACTIV2')));
                        vl_MontoRevCredit2 = (vl_MontoRevCredit2 + parseFloat(grid01.getStore().getAt(o).get('PASIV2')));
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) === '2131' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28) === '24704') {
                            vl_MontoLoDebit4 = (vl_MontoLoDebit4 + parseFloat(grid01.getStore().getAt(o).get('A1716ACTIV')));
                            vl_MontoLoCredit4 = (vl_MontoLoCredit4 + parseFloat(grid01.getStore().getAt(o).get('A1716PASIV')));
                            vl_MontoRevDebit4 = (vl_MontoRevDebit4 + parseFloat(grid01.getStore().getAt(o).get('ACTIV2')));
                            vl_MontoRevCredit4 = (vl_MontoRevCredit4 + parseFloat(grid01.getStore().getAt(o).get('PASIV2')));
                        }
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'AP' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'P' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'GL' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'G') {
                            Ext.Msg.alert('.: PRAXIS :.', 'file is not correct for the account' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')));
                            bvalida = false;
                            return;
                        }
                    }
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(0, 2) === '03') {
                        vl_MontoLoDebit3 = (vl_MontoLoDebit3 + parseFloat(grid01.getStore().getAt(o).get('A1716ACTIV')));
                        vl_MontoLoCredit3 = (vl_MontoLoCredit3 + parseFloat(grid01.getStore().getAt(o).get('A1716PASIV')));
                        vl_MontoRevDebit3 = (vl_MontoRevDebit3 + parseFloat(grid01.getStore().getAt(o).get('ACTIV2')));
                        vl_MontoRevCredit3 = (vl_MontoRevCredit3 + parseFloat(grid01.getStore().getAt(o).get('PASIV2')));
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(18, 22) === '1141' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')).substring(23, 28) === '13833') {
                            vl_MontoLoDebit5 = (vl_MontoLoDebit5 + parseFloat(grid01.getStore().getAt(o).get('A1716ACTIV')));
                            vl_MontoLoCredit5 = (vl_MontoLoCredit5 + parseFloat(grid01.getStore().getAt(o).get('A1716PASIV')));
                            vl_MontoRevDebit5 = (vl_MontoRevDebit5 + parseFloat(grid01.getStore().getAt(o).get('ACTIV2')));
                            vl_MontoRevCredit5 = (vl_MontoRevCredit5 + parseFloat(grid01.getStore().getAt(o).get('PASIV2')));
                        }
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'AR' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'R' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'GL' || Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) !== 'G') {
                            Ext.Msg.alert('.: PRAXIS :.', 'file is not correct for the account' + ' ' + Ext.String.trim(grid01.getStore().getAt(o).get('A1716CUENT')));
                            bvalida = false;
                            return;
                        }
                    }
                    var vl_TotalLoc2 = (vl_MontoLoDebit2 - vl_MontoLoCredit2);
                    var vl_TotalRev2 = (vl_MontoRevDebit2 - vl_MontoRevCredit2);
                    var vl_TotalLoc3 = (vl_MontoLoDebit3 - vl_MontoLoCredit3);
                    var vl_TotalRev3 = (vl_MontoRevDebit3 - vl_MontoRevCredit3);

                    var vl_TotalLoc4 = (vl_MontoLoDebit4 - vl_MontoLoCredit4);
                    var vl_TotalRev4 = (vl_MontoRevDebit4 - vl_MontoRevCredit4);

                    var vl_TotalLoc5 = (vl_MontoLoDebit5 - vl_MontoLoCredit5);
                    var vl_TotalRev5 = (vl_MontoRevDebit5 - vl_MontoRevCredit5);

                    if (vl_TotalLoc2 !== 0 || vl_TotalRev2 !== 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The Local Debit Amount must be equal to the Credit Amount the company 2 and 3');
                        bvalida = false;
                        return;
                    }
                    if (vl_TotalLoc3 !== 0 || vl_TotalRev3 !== 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The Local Debit Amount must be equal to the Credit Amount the company 2 and 3');
                        bvalida = false;
                        return;
                    }
                    if (vl_TotalLoc4 !== 0 || vl_TotalRev4 !== 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The GL and AP Amount does not match in tha account number 2131-24704');
                        bvalida = false;
                        return;
                    }
                    if (vl_TotalLoc5 !== 0 || vl_TotalRev5 !== 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The GL and AR Amount does not match in tha account number 2131-13833');
                        bvalida = false;
                        return;
                    }

                }
                if (opt !== '13' && opt !== '5' && opt !== '8' && opt !== '10') {
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716MODO')) !== 'F') {
                        if ((Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT')) !== 'ASR' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT')) !== 'BSP' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT')) !== 'MAN' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FUENT')) !== 'ARC')) {
                            Ext.Msg.alert('.: PRAXIS :.', 'The source of sale must be ASR OR BSP OR MAN');
                            bvalida = false;
                            return;
                        }
                    }
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FILE')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Must enter the file AR or AP or GL');
                    bvalida = false;
                    return;
                }

                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The form of payment should be filled');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Concept 2 is poorly entered');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'CC' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'CA' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'RA' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'TV' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'TX' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'FA' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'CM' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'OV' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'IS' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'NT' && Ext.String.trim(grid01.getStore().getAt(o).get('A1716FP')) !== 'CO') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The payment method has to be CC or CA  or RA or TV or TX or FA or CM or OV or IS or NT or CO');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('CONP1')) !== 'FP' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP1')) !== 'FA' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP1')) !== 'TX' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP1')) !== 'CM') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The Concept has to be FP or FA  or TX or CM');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'A' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'PP' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'tt' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'TT.' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'FP' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'XP' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'A<E' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'C,M' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'VL' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'PT' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'TX' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '04' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'S' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'C' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'FA' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'BA' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'AM' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'SA' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'TP' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '00' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '16' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === '4' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'T' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'VI' || Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) === 'BA') {
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== '139' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'OAL' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'FS' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'B1' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'A1' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'IK' && Ext.String.trim(grid01.getStore().getAt(o).get('CONP2')) !== 'NW') {
                        Ext.Msg.alert('.: PRAXIS :.', 'Concept 2 is poorly entered');
                        bvalida = false;
                        return;
                    }

                }

            }
            if (existeAR !== '') {
                if (VL_A1716MARCA === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter a bridge account in AR');
                    bvalida = false;
                    return;
                }
            }
            if (existeAP !== '') {
                if (VL_A1716MARCAAP === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter a bridge account in AP');
                    bvalida = false;
                    return;
                }
            }

            if (typeSubfu === '5D') {
                if (typeAP !== '1') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Must enter the file AP');
                    bvalida = false;
                }
                if (typeAR !== '1') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Must enter the file AR');
                    bvalida = false;
                }
            }
           // console.log(vl_TOTALACTIV.toFixed(2)+'-'+vl_TOTALPASIV.toFixed(2)+' 2 -'+vl_TOTALACTIV2.toFixed(2)+'-'+vl_TOTALPASIV2.toFixed(2));
            vl_netoLoc = (vl_TOTALACTIV.toFixed(2) - vl_TOTALPASIV.toFixed(2));
            vl_netoRev = (vl_TOTALACTIV2.toFixed(2) - vl_TOTALPASIV2.toFixed(2));

            //alert(vl_TOTALACTIV2 +'--moto --'+ vl_TOTALPASIV2.toFixed(2));
            if (vl_netoLoc !== 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The Local Debit Amount must be equal to the Credit Amount');
                bvalida = false;
                return;
            }
            if (vl_netoRev !== 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The Revenue Debit Amount must be equal to the Credit Amount');
                bvalida = false;
                return;
            }

        }

        return bvalida;
    },
    onClickSave: function (btn) {
        var me = this;
        var checkApply = '';
        if (me.validaRequiredFields()) {
            rec = me.view.params.rec;

            var vl_searchbyedt = Ext.getCmp(prototype.idadjnew + '-search-byedt').getValue();
            var opt = '';
            if (vl_searchbyedt === '1') {
                opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt1').getValue();
            } else if (vl_searchbyedt === '2') {
                opt = Ext.getCmp(prototype.idadjnew + '-CmbTtraxedt2').getValue();
            }
            var txtCia = Ext.getCmp(prototype.idadjnew + '-txtCia').getValue();
            var txtFrmaSerie = Ext.getCmp(prototype.idadjnew + '-txtFrmaSerie').getValue();
            var txtSeq = Ext.getCmp(prototype.idadjnew + '-txtSeq').getValue();
            var txtCpn = Ext.getCmp(prototype.idadjnew + '-txtCpn').getValue();
            var txtDate = Ext.getCmp(prototype.idadjnew + '-de-lblDate').getRawValue();
            // primer
            var lblTtarjeta_de = Ext.getCmp(prototype.idadjnew + '-de-lblTtarjeta').getValue();
            var lblNtarjeta_de = Ext.getCmp(prototype.idadjnew + '-de-lblNtarjeta').getValue();
            var lblRfig_de = Ext.getCmp(prototype.idadjnew + '-de-lblRfig').getValue();
            var lblRfis_de = Ext.getCmp(prototype.idadjnew + '-de-lblRfis').getValue();
            var lblVRic_de = Ext.getCmp(prototype.idadjnew + '-de-lblVRic').getValue();
            var lblFsale_de = Ext.getCmp(prototype.idadjnew + '-de-lblFsale').getValue();
            var lblIATA_de = Ext.getCmp(prototype.idadjnew + '-de-lblIATA').getValue();
            //primer
            var lblTtarjeta_co = Ext.getCmp(prototype.idadjnew + '-co-lblTtarjeta').getValue();
            var lblNtarjeta_co = Ext.getCmp(prototype.idadjnew + '-co-lblNtarjeta').getValue();
            var lblRfig_co = Ext.getCmp(prototype.idadjnew + '-co-lblRfig').getValue();
            var lblRfis_co = Ext.getCmp(prototype.idadjnew + '-co-lblRfis').getValue();
            var lblVRic_co = Ext.getCmp(prototype.idadjnew + '-co-lblVRic').getValue();
            var lblFsale_co = Ext.getCmp(prototype.idadjnew + '-co-lblFsale').getValue();
            var lblIATA_co = Ext.getCmp(prototype.idadjnew + '-co-lblIATA').getValue();
            //compara
            if (Ext.String.trim(lblTtarjeta_co) !== '') {
                lblTtarjeta_de = lblTtarjeta_co;
            }
            if (Ext.String.trim(lblNtarjeta_co) !== '') {
                lblNtarjeta_de = lblTtarjeta_co;
            }
            if (Ext.String.trim(lblRfig_co) !== '') {
                lblRfig_de = lblRfig_co;
            }
            if (Ext.String.trim(lblRfis_co) !== '') {
                lblRfis_de = lblRfis_co;
            }
            if (Ext.String.trim(lblVRic_co) !== '') {
                lblVRic_de = lblVRic_co;
            }
            if (Ext.String.trim(lblFsale_co) !== '') {
                lblFsale_de = lblFsale_co;
            }
            if (Ext.String.trim(lblIATA_co) !== '') {
                lblIATA_de = lblIATA_co;
            }
            //segundo
            var lblAmount_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblAmount').getValue().replace(',', '');
            var lblCurrency_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrency').getValue();
            var lblCommision_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblCommision').getValue().replace(',', '');
            var lblSCommision_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommision').getValue().replace(',', '');
            var lblYQ_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblYQ').getValue().replace(',', '');
            var lblFBASIS_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblFBASIS').getValue();
            var lblCARRIER_de = Ext.getCmp(prototype.idadjnew + '-de-lblCARRIER').getValue();
            //segundo
            var lblAmount_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblAmount').getValue().replace(',', '');
            var lblCurrency_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrency').getValue();
            var lblCommision_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblCommision').getValue().replace(',', '');
            var lblSCommision_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommision').getValue().replace(',', '');
            var lblYQ_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblYQ').getValue().replace(',', '');
            var lblFBASIS_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblFBASIS').getValue();
            var lblCARRIER_co = Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER').getValue();
            //Compara
            if (parseFloat(lblAmount_co) !== 0) {
                lblAmount_de = lblAmount_co;
            }
            if (Ext.String.trim(lblCurrency_co) !== '') {
                lblCurrency_de = lblCurrency_co;
            }
            if (parseFloat(lblCommision_co) !== 0) {
                lblCommision_de = lblCommision_co;
            }
            if (parseFloat(lblSCommision_co) !== 0) {
                lblSCommision_de = lblSCommision_co;
            }
            if (parseFloat(lblYQ_co) !== 0) {
                lblYQ_de = lblYQ_co;
            }
            if (Ext.String.trim(lblFBASIS_co) !== '') {
                lblFBASIS_de = lblFBASIS_co;
            }
            if (Ext.String.trim(lblCARRIER_co) !== '') {
                lblCARRIER_de = lblCARRIER_co;
            }
            //tercer
            var lblTC_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblTC').getValue().replace(',', '');
            var lblCurrencyREV_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblCurrencyREV').getValue();
            var lblAmountREV_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblAmountREV').getValue().replace(',', '');
            var lblCommisionREV_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblCommisionREV').getValue().replace(',', '');
            var lblSCommisionREV_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblSCommisionREV').getValue().replace(',', '');
            var lblYQREV_de = Ext.getCmp(prototype.idadjnew + '-de-label-lblYQREV').getValue().replace(',', '');
            //tercer
            var lblTC_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblTC').getValue().replace(',', '');
            var lblCurrencyREV_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblCurrencyREV').getValue();
            var lblAmountREV_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblAmountREV').getValue().replace(',', '');
            var lblCommisionREV_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblCommisionREV').getValue().replace(',', '');
            var lblSCommisionREV_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblSCommisionREV').getValue().replace(',', '');
            var lblYQREV_co = Ext.getCmp(prototype.idadjnew + '-co-label-lblYQREV').getValue().replace(',', '');
            //compara
            if (parseFloat(lblTC_co) !== 0) {
                lblTC_de = lblTC_co;
            }
            if (parseFloat(lblCurrencyREV_co) !== 0) {
                lblCurrencyREV_de = lblCurrencyREV_co;
            }
            if (parseFloat(lblAmountREV_co) !== 0) {
                lblAmountREV_de = lblAmountREV_co;
            }
            if (parseFloat(lblCommisionREV_co) !== 0) {
                lblCommisionREV_de = lblCommisionREV_co;
            }
            if (parseFloat(lblSCommisionREV_co) !== 0) {
                lblSCommisionREV_de = lblSCommisionREV_co;
            }
            if (parseFloat(lblYQREV_co) !== 0) {
                lblYQREV_de = lblYQREV_co;
            }
            //cuarto
            var lblGroup = Ext.getCmp(prototype.idadjnew + '-de-lblGroup').getValue();
            var lblTdoc_de = Ext.getCmp(prototype.idadjnew + '-de-lblTdoc').getValue();
            var lblIATATrx = Ext.getCmp(prototype.idadjnew + '-de-lblIATATrx').getValue();
            var TKTREFE = Ext.getCmp(prototype.idadjnew + '-co-TKTREFE').getValue();
            var TKTSEQ = Ext.getCmp(prototype.idadjnew + '-co-TKTSEQ').getValue();
            var txtAffectTNU = '0';
            if (Ext.getCmp(prototype.idadjnew + '-txtAffectTNU').getValue()) {
                txtAffectTNU = '1';
            }

            var cmbTYPEUSE = Ext.getCmp(prototype.idadjnew + '-de-cmbTYPEUSE').getValue();
            var cmbTYUSEASS = Ext.getCmp(prototype.idadjnew + '-de-cmbTYUSEASS').getValue();
            //validar
            var ORIGEN = Ext.getCmp(prototype.idadjnew + '-co-ORIGEN').getValue();
            var DESTINO = Ext.getCmp(prototype.idadjnew + '-co-DESTINO').getValue();
            var FLIGHT = Ext.getCmp(prototype.idadjnew + '-co-FLIGHT').getValue();
            var lblCARRIER2 = Ext.getCmp(prototype.idadjnew + '-co-lblCARRIER2').getValue();
            var AmountLoc = Ext.getCmp(prototype.idadjnew + '-co-AmountLoc').getValue();
            var AmountRev = Ext.getCmp(prototype.idadjnew + '-co-AmountRev').getValue();
            var txtAffectation = Ext.getCmp(prototype.idadjnew + '-txtAffectation').getValue();
            var country = Ext.getCmp(prototype.idadjnew + '-country').getValue();
            var txaReference = Ext.getCmp(prototype.idadjnew + '-txaReference').getValue();
            var vl_A720TCAMB = me.listloadTicket.A720TCAMB;
            //vl_A720TCAMB=vl_A720TCAMB.toString();
            //console.log(lblAmount_de);

            global.Msg({
                msg: 'Insert Data?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {

                        me.listdatosguadar.VP_FILTER = Ext.String.trim(vl_searchbyedt);
                        me.listdatosguadar.VP_opt = Ext.String.trim(opt);
                        me.listdatosguadar.VP_CIA = Ext.String.trim(txtCia);
                        me.listdatosguadar.VP_TICKET = Ext.String.trim(txtFrmaSerie);
                        me.listdatosguadar.VP_Seq = Ext.String.trim(txtSeq);
                        me.listdatosguadar.VP_Cpn = Ext.String.trim(txtCpn);
                        me.listdatosguadar.VP_Date = Ext.String.trim(txtDate);
                        me.listdatosguadar.A2024TTARJ = Ext.String.trim(lblTtarjeta_de);
                        me.listdatosguadar.A2024NTARJ = Ext.String.trim(lblNtarjeta_de);
                        me.listdatosguadar.A2024RFIC = Ext.String.trim(lblRfig_de);
                        me.listdatosguadar.A2024RFIS = Ext.String.trim(lblRfis_de);
                        me.listdatosguadar.A2024VRICOC = Ext.String.trim(lblVRic_de);
                        me.listdatosguadar.A2024FECVTA = Ext.String.trim(lblFsale_de);
                        me.listdatosguadar.A2024AGENT = Ext.String.trim(lblIATA_de);
                        me.listdatosguadar.A2024IATAUSU = global.fillZeros(8, Ext.String.trim(txtAffectation));
                        me.listdatosguadar.A2024GRUPO = Ext.String.trim(lblGroup);
                        me.listdatosguadar.A2024TDOC = Ext.String.trim(lblTdoc_de);
                        me.listdatosguadar.A2024TRNC = Ext.String.trim(me.listloadTicket.A720TRNCU);
                        //me.listdatosguadar.A2024FECIN=Ext.String.trim(me.listloadTicket.A720FVLO3);
                        me.listdatosguadar.A2024TFUEN = Ext.String.trim(me.listloadTicket.A1530TFUEN);
                        me.listdatosguadar.A2024BANCO = Ext.String.trim(me.listloadTicket.A1530BANCO);
                        me.listdatosguadar.A2024PSVTA = Ext.String.trim(country);
                        me.listdatosguadar.A2024CSABR = Ext.String.trim(me.listloadTicket.A1530CSABR);
                        me.listdatosguadar.A2024FPROC = Ext.String.trim(me.listloadTicket.A1530FPROC);
                        me.listdatosguadar.A2024TCAMB = vl_A720TCAMB;
                        me.listdatosguadar.A2024TASIVA = Ext.String.trim(me.listloadTicket.A720TPTKT);
                        me.listdatosguadar.A2024PNRLOC = Ext.String.trim(me.listloadTicket.A720TPTKT);
                        me.listdatosguadar.A2024FOPENC = Ext.String.trim(me.listloadTicket.A1530FDESD);
                        me.listdatosguadar.VP_SEQVTA = Ext.String.trim(me.listloadTicket.SEQVTA);
                        me.listdatosguadar.A2024DESCRIP = Ext.String.trim(txaReference);
                        me.listdatosguadar.VP_TypeUse = Ext.String.trim(cmbTYPEUSE);
                        me.listdatosguadar.VP_TypeVoid = Ext.String.trim(cmbTYUSEASS);
                        me.listdatosguadar.A1541VCPVE = lblAmount_de;
                        me.listdatosguadar.A1541MDAVE = Ext.String.trim(lblCurrency_de);
                        me.listdatosguadar.A1541LCMVE = lblCommision_de;
                        me.listdatosguadar.A1541LSCMV = lblSCommision_de;
                        me.listdatosguadar.A1541LYQVE = lblYQ_de;
                        me.listdatosguadar.FBASIS = Ext.String.trim(lblFBASIS_de);
                        me.listdatosguadar.CARRIER = Ext.String.trim(lblCARRIER_de);
                        me.listdatosguadar.ESTA_TNU = Ext.String.trim(txtAffectTNU);
                        me.listdatosguadar.REFE = Ext.String.trim(TKTREFE);
                        me.listdatosguadar.TKTSEQ = Ext.String.trim(TKTSEQ);
                        me.listdatosguadar.ORI = Ext.String.trim(ORIGEN);
                        me.listdatosguadar.DESTI = Ext.String.trim(DESTINO);
                        me.listdatosguadar.NVLO = Ext.String.trim(FLIGHT);
                        me.listdatosguadar.CARR = Ext.String.trim(lblCARRIER2);
                        me.listdatosguadar.AMOUNT = AmountLoc;
                        me.listdatosguadar.AMOUNTRV = AmountRev;
                        me.listdatosguadar.A1541TCRVE = lblTC_de;
                        me.listdatosguadar.A1541VCPRV = lblAmountREV_de;
                        me.listdatosguadar.A1541MREVE = Ext.String.trim(lblCurrencyREV_de);
                        me.listdatosguadar.A1541RCMVE = lblCommisionREV_de;
                        me.listdatosguadar.A1541RSCMV = lblSCommisionREV_de;
                        me.listdatosguadar.A1541LYQVERV = lblYQREV_de;
                        me.listdatosguadar.A1541AGENTE = lblIATATrx;

                        var lstCorrectData = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idadjnew + '-de-gridCorrectData').getStore().data.items[i].data;
                            lstCorrectData.push(bean);
                        }
                        //console.log(me.listdatosguadar);return;
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idadjnew + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/loadGuardar/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.listdatosguadar),
                                beanlstCorrectData: JSON.stringify(lstCorrectData)
                            },
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'Proceso Culminado') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idadjnew + '-win').close();
                                            Ext.getCmp(prototype.idadj + '-Contenedor').getController().imgSearch_clickHandler();
                                        }


                                    }});
                            }
                        });
                    }

                }
            });
        }


    },

    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {
             this.onBtnSearch();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBtnFindtickets: function () {
        var me = this;
        var winBrowser = Ext.create('Ext.global.BrowserTicket', {
            id: prototype.idbrowser + '-browser-tkt'
        });
        winBrowser.show();
        me.winBrowser = winBrowser.getUniqueId();
        //Ext.getCmp( Ext.getCmp(prototype.idbrowser + '-browser-tkt').getUniqueId()+'-txtCus').getValue()
        //Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);

        //Ext.getCmp('BrowserTicket-Container-ADJAccountingForm-browser-tkt-ext-494'+'-btn-search')
        //BrowserTicket-Container-ADJAccountingForm-browser-tkt-ext-494-btn-search-btnIconEl

        //winBrowser.getUniqueId()
        /*
         var win = new Ext.Praxis.view.sales.ADJAccountingForm.DataEntryNew({
         params: {
         action: action,
         rec: rec
         }
         });
         win.show();
         */
    },

});


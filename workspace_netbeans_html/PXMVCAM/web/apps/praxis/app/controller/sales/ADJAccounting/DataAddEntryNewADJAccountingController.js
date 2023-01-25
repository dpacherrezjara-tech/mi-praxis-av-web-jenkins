/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ADJAccounting.DataAddEntryNewADJAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataAddEntryNewADJAccountingController',
    paramsViewAccounting: {},
    paramsAddAccount: {},
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
        me.setStores();
        me.onLoadDataQuery(me.view.params.listAddNuewdatos);
        var cmbDocumentType = Ext.getCmp(prototype.idadjaddnew + '-cmbDocumentType');
        var cmbAccountType = Ext.getCmp(prototype.idadjaddnew + '-cmbAccountType');
        var cmbCategory = Ext.getCmp(prototype.idadjaddnew + '-cmbCategory');
        if (me.view.params.listAddNuewdatos.opt === '5' || me.view.params.listAddNuewdatos.opt === '13') {
            cmbDocumentType.show();
            cmbAccountType.show();
            cmbCategory.show();
            me.onLoadCombo();
            if (Ext.getCmp(prototype.idadjaddnew + '-txtIATAFLOWN').getValue() !== '') {
                me.onAddAccount();

            }

        }

        // this.CleanFields();

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idadjaddnew + '-de-gridViewAccounting');
        var grid02 = Ext.getCmp(prototype.idadjaddnew + '-de-gridFLOWN');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idadjaddnew + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idadjaddnew + '-store-grid02'
        });
        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    onAddAccount: function () {
        var me = this;
        var cmbDocumentType = Ext.getCmp(prototype.idadjaddnew + '-cmbDocumentType').getValue();
        var txtIATAFLOWN = Ext.getCmp(prototype.idadjaddnew + '-txtIATAFLOWN').getValue();
        if (cmbDocumentType === 'ALL') {
            cmbDocumentType = '';
        }
        var cmbAccountType = Ext.getCmp(prototype.idadjaddnew + '-cmbAccountType').getValue();
        var cmbCategory = Ext.getCmp(prototype.idadjaddnew + '-cmbCategory').getValue();
        if (cmbCategory === 'ALL') {
            cmbCategory = '';
        }
        if (txtIATAFLOWN === '') {
            me.focus('txtIATAFLOWN');
            global.Msg({msg: 'Required Field, Iata'});
            return;
        }

        if (me.view.params.listAddNuewdatos.opt === '5') {
            me.paramsAddAccount.IN_A1740SUBTI_OLD = txtIATAFLOWN;
            me.paramsAddAccount.IN_A1740TIPO = Ext.String.trim(cmbDocumentType);
            me.paramsAddAccount.A1740SUBTI = Ext.String.trim(cmbAccountType);
            me.paramsAddAccount.A1740CATEG = Ext.String.trim(cmbCategory);
            me.paramsAddAccount.A1740CTA = '';
            me.paramsAddAccount.A1740SCTA = '';
            me.paramsAddAccount.A1740TIPODESC = me.view.params.listAddNuewdatos.opt;
            me.paramsAddAccount.IN_A1740TIPO_OLD = '';
        } else {
            me.paramsAddAccount.IN_A1740SUBTI_OLD = txtIATAFLOWN;
            me.paramsAddAccount.IN_A1740TIPO = Ext.String.trim(cmbDocumentType);
            me.paramsAddAccount.A1740SUBTI = Ext.String.trim(cmbAccountType);
            me.paramsAddAccount.A1740CATEG = Ext.String.trim(cmbCategory);
            me.paramsAddAccount.A1740CTA = '';
            me.paramsAddAccount.A1740SCTA = '';
            me.paramsAddAccount.A1740TIPODESC = me.view.params.listAddNuewdatos.opt;
            me.paramsAddAccount.IN_A1740TIPO_OLD = me.view.params.listAddNuewdatos.txtFrmaSerie;
        }
        Ext.getCmp(prototype.idadjaddnew + '-winaddnew').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchCta',
            method: 'POST',
            timeout: '60000000',
            params: me.paramsAddAccount,
            success: function (response, options) {
                Ext.getCmp(prototype.idadjaddnew + '-winaddnew').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idadjaddnew + '-de-gridFLOWN').getStore().removeAll();
                Ext.getCmp(prototype.idadjaddnew + '-de-gridFLOWN').getStore().loadData(res.lst_ViewAccounting);


            }
        });



    },
    onLoadCombo: function () {
        var cmbDocumentType = Ext.getCmp(prototype.idadjaddnew + '-cmbDocumentType');
        var cmbAccountType = Ext.getCmp(prototype.idadjaddnew + '-cmbAccountType');
        var cmbCategory = Ext.getCmp(prototype.idadjaddnew + '-cmbCategory');
        Ext.getCmp(prototype.idadjaddnew + '-winaddnew').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadDataCmbo',
            method: 'POST',
            timeout: '60000000',
            params: {},
            success: function (response, options) {
                Ext.getCmp(prototype.idadjaddnew + '-winaddnew').unmask();
                var res = Ext.JSON.decode(response.responseText);
                cmbDocumentType.setStore(res.loadDocumentType);
                cmbAccountType.setStore(res.loadAccountType);
                cmbCategory.setStore(res.loadCategory);


            }
        });



    },
    onLoadDataQuery: function (listAddNuewdatos) {
        var grid = Ext.getCmp(prototype.idadjaddnew + '-de-gridViewAccounting');
        var grid02 = Ext.getCmp(prototype.idadjaddnew + '-de-gridFLOWN');
        var btnSearchaddnew = Ext.getCmp(prototype.idadjaddnew + '-de-btnSearchaddnew');
        var addaccountaddnew = Ext.getCmp(prototype.idadjaddnew + '-de-addaccountaddnew');
        var DataCombo = '';
        if (listAddNuewdatos.opt !== '') {
            if (listAddNuewdatos.opt === '1') {
                DataCombo = 'SALE';
            } else if (listAddNuewdatos.opt === '2' || listAddNuewdatos.opt === '6') {
                DataCombo = 'EXCH';
            } else if (listAddNuewdatos.opt === '3' || listAddNuewdatos.opt === '7') {
                DataCombo = 'RFND';
            } else if (listAddNuewdatos.opt === '5' || listAddNuewdatos.opt === '13') {
                DataCombo = 'FLOWN';
            } else if (listAddNuewdatos.opt === '9') {
                DataCombo = 'DISC';
            } else if (listAddNuewdatos.opt === '8') {
                DataCombo = 'IXP';
            } else if (listAddNuewdatos.opt === '10') {
                DataCombo = 'IXC';
            } else {
                DataCombo = 'OP';
            }
        }
        Ext.getCmp(prototype.idadjaddnew + '-txtIATAFLOWN').setValue(listAddNuewdatos.IATA);
        Ext.getCmp(prototype.idadjaddnew + '-txtCiaaddnew').setValue(listAddNuewdatos.txtCia);
        Ext.getCmp(prototype.idadjaddnew + '-txtFrmaSerieaddnew').setValue(listAddNuewdatos.txtFrmaSerie);
        Ext.getCmp(prototype.idadjaddnew + '-txtSeqaddnew').setValue(listAddNuewdatos.txtSeq);
        Ext.getCmp(prototype.idadjaddnew + '-txtTransactionaddnew').setValue(DataCombo);
        Ext.getCmp(prototype.idadjaddnew + '-txtCpnaddnew').setValue(listAddNuewdatos.CPN);
        Ext.getCmp(prototype.idadjaddnew + '-txtTDOCaddnew').setValue(listAddNuewdatos.Tdoc);
        Ext.getCmp(prototype.idadjaddnew + '-txtTFORaddnew').setValue(listAddNuewdatos.TFor);
        Ext.getCmp(prototype.idadjaddnew + '-de-CardTypeaddnew').setValue(listAddNuewdatos.ttarjeta);
        Ext.getCmp(prototype.idadjaddnew + '-de-CardNumberaddnew').setValue(listAddNuewdatos.Ntarjeta);
        Ext.getCmp(prototype.idadjaddnew + '-de-RFICaddnew').setValue(listAddNuewdatos.Rfic);
        Ext.getCmp(prototype.idadjaddnew + '-de-RFISaddnewa').setValue(listAddNuewdatos.Rfis);
        Ext.getCmp(prototype.idadjaddnew + '-de-CurrLocaddnew').setValue(listAddNuewdatos.MdaLoc);
        Ext.getCmp(prototype.idadjaddnew + '-de-ExchangeRateaddnew').setValue(listAddNuewdatos.TCAMB);
        if (DataCombo === 'FLOWN') {
            grid.hide();
            btnSearchaddnew.hide();
            addaccountaddnew.show();
            grid02.show();
            Ext.getCmp(prototype.idadjaddnew + '-de-CurrLocaddnew').setValue('USD');
            if (listAddNuewdatos.Nuemro !== '') {
                Ext.getCmp(prototype.idadjaddnew + '-de-Concept2addnew').setValue(listAddNuewdatos.Nuemro);
            } else {
                Ext.getCmp(prototype.idadjaddnew + '-de-Concept2addnew').setValue('139');
            }


        } else {
            grid.show();
            btnSearchaddnew.show();
            addaccountaddnew.hide();
            grid02.hide();
        }

    },
    onBtnSearch: function () {
        var me = this;

        rec = me.view.params.listAddNuewdatos;

        var DataCombo = '';
        if (rec.opt !== '') {
            if (rec.opt === '1') {
                DataCombo = 'SALE';
            } else if (rec.opt === '2' || rec.opt === '6') {
                DataCombo = 'EXCH';
            } else if (rec.opt === '3' || rec.opt === '7') {
                DataCombo = 'RFND';
            } else if (rec.opt === '5' || rec.opt === '13') {
                DataCombo = 'FLOWN';
            } else if (rec.opt === '9') {
                DataCombo = 'DISC';
            } else if (rec.opt === '8') {
                DataCombo = 'IXP';
            } else if (rec.opt === '10') {
                DataCombo = 'IXC';
            } else {
                DataCombo = 'OP';
            }
        }
        me.paramsViewAccounting.AIRLINE = rec.txtCia;
        me.paramsViewAccounting.MODE = 'VIEW ACCU';
        me.paramsViewAccounting.TKT = rec.txtCia + '' + rec.txtFrmaSerie;
        me.paramsViewAccounting.SEQ = rec.txtSeq;
        me.paramsViewAccounting.TRANSACTION = DataCombo;
        if (rec.CPN === '1') {
            me.paramsViewAccounting.CUPON1 = '1';
        } else {
            me.paramsViewAccounting.CUPON1 = '';
        }
        if (rec.CPN === '2') {
            me.paramsViewAccounting.CUPON2 = '2';
        } else {
            me.paramsViewAccounting.CUPON2 = '';
        }
        if (rec.CPN === '3') {
            me.paramsViewAccounting.CUPON3 = '3';
        } else {
            me.paramsViewAccounting.CUPON3 = '';
        }
        if (rec.CPN === '4') {
            me.paramsViewAccounting.CUPON4 = '4';
        } else {
            me.paramsViewAccounting.CUPON4 = '';
        }
        me.paramsViewAccounting.FLAG = '1';
        me.paramsViewAccounting.STERROR = '';
        me.paramsViewAccounting.SEQTRAN = 0;
        me.paramsViewAccounting.FROM = '';
        me.paramsViewAccounting.TO = '';
        me.paramsViewAccounting.FUENTE = '';
        me.paramsViewAccounting.PAIS = '';
        me.paramsViewAccounting.CHANNEL = '';


        Ext.getCmp(prototype.idadjaddnew + '-winaddnew').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/loadViewAccounting',
            method: 'POST',
            timeout: '60000000',
            params: me.paramsViewAccounting,
            success: function (response, options) {
                Ext.getCmp(prototype.idadjaddnew + '-winaddnew').unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idadjaddnew + '-de-gridViewAccounting').getStore().removeAll();
                if (res.success) {
                    Ext.getCmp(prototype.idadjaddnew + '-de-gridViewAccounting').getStore().loadData(res.lst_ViewAccounting);
                    if (res.lst_ViewAccounting[0].CODERROR !== '') {
                        global.Msg({msg: res.lst_ViewAccounting[0].CODERROR + ' - ' + res.lst_ViewAccounting[0].MENSAJE, icon: 2, fn: function () {
                            }});
                    }

                    //


                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }


            }
        });
    },
    onSelectClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.idadjaddnew + '-de-AccountNumber1').setValue(rec.data.A1740CTA);
        Ext.getCmp(prototype.idadjaddnew + '-de-Description1').setValue(rec.data.A1740CLIE);
        Ext.getCmp(prototype.idadjaddnew + '-de-LIB1').setValue(rec.data.A1740CATEG);

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
        var selecTypeFit = Ext.getCmp(prototype.idadjaddnew + '-search-byedt').getValue();
        var opt = '';
        var opt2 = '';
        var txtCia = Ext.getCmp(prototype.idadjaddnew + '-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.idadjaddnew + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idadjaddnew + '-txtSeq').getValue();
        var txtCupon1 = Ext.getCmp(prototype.idadjaddnew + '-txtCpn').getValue();
        var txtDate = Ext.getCmp(prototype.idadjaddnew + '-de-lblDate').getRawValue();
        var CUPON = '';
        var msj = '';
        if (selecTypeFit === '0') {
            msj = 'Select Type Of Adj';
            return msj;
        }
        if (selecTypeFit === '1') {
            opt = Ext.getCmp(prototype.idadjaddnew + '-CmbTtraxedt1').getValue();
        } else if (selecTypeFit === '2') {
            opt = Ext.getCmp(prototype.idadjaddnew + '-CmbTtraxedt2').getValue();
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
    onAcceptClick: function () {
        var DataCombo = '';
        var me = this;
        rec = me.view.params.listAddNuewdatos;
        var grid = Ext.getCmp(prototype.idadjaddnew + '-de-gridViewAccounting');
        var grid02 = Ext.getCmp(prototype.idadjaddnew + '-de-gridCorrectData');
        var regs = grid02.getStore().getCount();
        var opt = '';
        global.Msg({
            msg: 'Are you sure to add the row ?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (rec.opt !== '') {
                        if (rec.opt === '1') {
                            DataCombo = 'S';
                        } else if (rec.opt === '2' || rec.opt === '6') {
                            DataCombo = 'J';
                        } else if (rec.opt === '3' || rec.opt === '7') {
                            DataCombo = 'R';
                        } else if (rec.opt === '5' || rec.opt === '13') {
                            DataCombo = 'F';
                        } else if (rec.opt === '9') {
                            DataCombo = 'C';
                        } else if (rec.opt === '8') {
                            DataCombo = 'L';
                        } else if (rec.opt === '10') {
                            DataCombo = 'L';
                        } else if (rec.opt === '4') {
                            DataCombo = 'M';
                        } else {
                            DataCombo = 'OP';
                        }
                    }
                    var DataCombo2 = '';
                    if (rec.opt !== '') {
                        if (rec.opt === '1') {
                            DataCombo2 = 'SALE';
                        } else if (rec.opt === '2' || rec.opt === '6') {
                            DataCombo2 = 'EXCH';
                        } else if (rec.opt === '3' || rec.opt === '7') {
                            DataCombo2 = 'RFND';
                        } else if (rec.opt === '5' || rec.opt === '13') {
                            DataCombo2 = 'FLOWN';
                        } else if (rec.opt === '9') {
                            DataCombo2 = 'DISC';
                        } else if (rec.opt === '8') {
                            DataCombo2 = 'IXP';
                        } else if (rec.opt === '10') {
                            DataCombo2 = 'IXC';
                        } else {
                            DataCombo2 = 'OP';
                        }
                    }
                    if (grid.getSelectionModel().hasSelection()) {
                        var selection = grid.getSelectionModel().getSelected();
                        for (var i = 0; i < selection.length; i++) {
                            var row = grid.getSelectionModel().getSelection()[i];
                            var beanDatos = {};
                            /*for (var e = 0; e < regs; e++) {
                             if (grid02.getStore().getAt(e).get('A1716SEQT') === row.get('A1716SEQT')) {
                             if (grid02.getStore().getAt(e).get('A1716CUENT') === row.get('A1716CUENT') && grid02.getStore().getAt(e).get('A1716FILE') === row.get('A1716FILE')) {
                             Ext.Msg.alert('.: PRAXIS :.', 'There is already the row selected');
                             return;
                             }
                             
                             }
                             }*/
                            if (row.get('TRANSACTION') !== DataCombo2) {
                                Ext.Msg.alert('.: PRAXIS :.', 'The Transaction must be equal in the Mode ' + row.get('A1716MODO') + ' ' + DataCombo2);
                                return;
                            }
                            beanDatos.A1716CUPON = rec.CPN;

                            beanDatos.A1716MODO = DataCombo;
                            beanDatos.A1716FUENT = Ext.String.trim(row.get('FUENTE'));
                            beanDatos.A1716SUBFU = Ext.String.trim(row.get('SUBFUENTE'));
                            if(Ext.String.trim(row.get('CTA'))!==''){
                                var cuenta=Ext.String.trim(row.get('CTA'));
                                beanDatos.A1716CUENT = cuenta.substring(0, 2) +"-"+ cuenta.substring(2, 4) +"-"+ cuenta.substring(4, 10) +"-"+ cuenta.substring(10, 14) +"-"+ cuenta.substring(14, 18) +"-"+ cuenta.substring(18, 23) +"-"+ cuenta.substring(23, 27) +"-"+ cuenta.substring(27, 29);
                            }else{
                                beanDatos.A1716CUENT = '';
                            }
                            
                            beanDatos.A1716CUR = Ext.String.trim(row.get('MONEDA'));
                            if (rec.opt === '13' || rec.opt === '5') {
                                if (Ext.String.trim(row.get('MONEDA')) === '') {
                                    beanDatos.A1716CUR = 'USD';
                                }
                            }
                            if (rec.opt === '8' || rec.opt === '10') {
                                if (Ext.String.trim(row.get('MONEDA')) === '') {
                                    beanDatos.A1716CUR = 'USD';
                                } else {
                                    beanDatos.A1716CUR = Ext.String.trim(row.get('MONEDA'));
                                }
                            }
                            if (row.get('DEBITO') !== '') {
                                beanDatos.A1716ACTIV = row.get('DEBITO');
                            } else {
                                beanDatos.A1716ACTIV = 0;
                            }
                            if (row.get('CREDITO') !== '') {
                                beanDatos.A1716PASIV = row.get('CREDITO');
                            } else {
                                beanDatos.A1716PASIV = 0;
                            }
                            if (row.get('DEBITORV') !== '') {
                                beanDatos.ACTIV2 = row.get('DEBITORV');
                            } else {
                                beanDatos.ACTIV2 = 0;
                            }
                            if (row.get('CREDITORV') !== '') {
                                beanDatos.PASIV2 = row.get('CREDITORV');
                            } else {
                                beanDatos.PASIV2 = 0;
                            }

                            beanDatos.A1716TITU = Ext.String.trim(row.get('TITULO'));
                            beanDatos.A1716COPE = Ext.String.trim(row.get('A1716COPE'));

                            beanDatos.A1716CLIEN = Ext.String.trim(row.get('CLIENTE'));
                            beanDatos.A1716PROV = Ext.String.trim(row.get('PROVEEDOR'));
                            beanDatos.A1716DIREC = Ext.String.trim(row.get('DIRECCION'));
                            beanDatos.A1716FILE = Ext.String.trim(row.get('LIB1'));
                            beanDatos.A1716FUENT = Ext.String.trim(row.get('FUENTE'));
                            beanDatos.A1716FP = Ext.String.trim(row.get('CONCEPT1'));
                            beanDatos.CONP1 = Ext.String.trim(row.get('CONCEPT1'));
                            beanDatos.CONP2 = Ext.String.trim(row.get('CONCEPT2'));
                            beanDatos.CONP3 = Ext.String.trim(row.get('CONCEPT3'));

                            beanDatos.A1716TARJ = Ext.String.trim(row.get('TTARJ'));
                            beanDatos.A1716NTARJ = Ext.String.trim(row.get('NTARJ'));
                            beanDatos.A1716TIDOC = Ext.String.trim(row.get('TDOC'));
                            beanDatos.ORAC = Ext.String.trim(row.get('TD_ORACLE'));
                            beanDatos.A1716ORIG = Ext.String.trim(row.get('CONCEPT2'));

                            if (rec.SET !== '') {
                                beanDatos.A1716SEQT = rec.SET;
                            } else {
                                beanDatos.A1716SEQT = '00';
                            }
                            beanDatos.A1530POLIZA = Ext.String.trim(row.get('LIB1'));
                            beanDatos.LIB1 = Ext.String.trim(row.get('LIB1'));
                            beanDatos.A1716RFIC = Ext.String.trim(row.get('RFIC'));
                            beanDatos.A1716RFIS = Ext.String.trim(row.get('RFIS'));
                            beanDatos.A1716VRic = Ext.String.trim(row.get('VRIC'));
                            beanDatos.LIB1CIA = Ext.String.trim(row.get('CIA1'));
                            beanDatos.CTAC = Ext.String.trim(row.get('CTACTRL'));
                            beanDatos.TITUC = Ext.String.trim(row.get('TITULOCTRL'));
                            beanDatos.LIB1C = Ext.String.trim(row.get('LIBCTRL'));
                            beanDatos.CTAP = Ext.String.trim(row.get('CTAPROVEE'));
                            beanDatos.TITUP = Ext.String.trim(row.get('TITULOPROVEE'));
                            beanDatos.LIB1P = Ext.String.trim(row.get('LIBPROVEE'));
                            beanDatos.CTAPC = Ext.String.trim(row.get('CTACTRLPROVEE'));
                            beanDatos.TITUPC = Ext.String.trim(row.get('TITULOCTRLPROVEE'));
                            beanDatos.LIB1PC = Ext.String.trim(row.get('LIBCTRLPROVEE'));
                            beanDatos.CTAPAR = Ext.String.trim(row.get('CTAARPROVEE'));
                            beanDatos.TITUPAR = Ext.String.trim(row.get('TITULOARPROVEE'));
                            beanDatos.LIB1PAR = Ext.String.trim(row.get('LIBARPROVEE'));
                            beanDatos.CLIENTAR = Ext.String.trim(row.get('CLIENTEAR06'));
                            beanDatos.DIRECCAR = Ext.String.trim(row.get('DIRECCIONAR06'));
                            beanDatos.ORACAR = Ext.String.trim(row.get('TD_ORACLEAR06'));
                            beanDatos.A1716MARCA = '';
                            Ext.getCmp(prototype.idadjnew + '-co-lblIATA').setValue(row.get('IATAVTA'));
                            if (Ext.getCmp(prototype.idadjnew + '-de-lblGroup').getValue() === '') {
                                Ext.getCmp(prototype.idadjnew + '-de-lblGroup').setValue(row.get('GRUPO'));
                            }
                            beanDatos.COMB = row.get('TCAMB');
                            if (Ext.getCmp(prototype.idadjnew + '-country').getValue() === '') {
                                Ext.getCmp(prototype.idadjnew + '-country').setValue(row.get('PAIS'));
                            }
                            if (row.get('A1716MARCA')) {
                                if (rec.opt === '1' || rec.opt === '2' || rec.opt === '3' || rec.opt === '4' || rec.opt === '6' || rec.opt === '7' || rec.opt === '9') {
                                    // beanDatos.A1716MARCA = 'P';
                                    beanDatos.A1716MARCA = 'PTE';
                                } else {
                                    //beanDatos.A1716MARCA = 'X';
                                    beanDatos.A1716MARCA = 'PTE';
                                }
                            }
                            if (row.get('LIB1') === 'GL' || row.get('LIB1') === 'AR' || row.get('LIB1') === 'AP') {
                                if (Ext.String.trim(row.get('TITULO')) === 'CUENTA CONTROL INGRESOS PRAXIS') {
                                    if (rec.opt === '1' || rec.opt === '2' || rec.opt === '3' || rec.opt === '4' || rec.opt === '6' || rec.opt === '7' || rec.opt === '9') {
                                        // beanDatos.A1716MARCA = 'P';
                                        beanDatos.A1716MARCA = 'PTE';
                                    } else {
                                        //beanDatos.A1716MARCA = 'X';
                                        beanDatos.A1716MARCA = 'PTE';
                                    }
                                }
                            }
                            grid02.getStore().add(beanDatos);

                        }
                    } else {
                        global.Msg({msg: 'You must select at least one record'});
                        return;
                    }
                }
            }
        });



    },
    onChkModify1: function (obj) {
        if (obj) {
            var vl_DebitLocaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitLocaddnew').getValue());
            var vl_ExchangeRateaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-ExchangeRateaddnew').getValue());
            Ext.getCmp(prototype.idadjaddnew + '-de-DebitRevaddnew').setValue(Ext.util.Format.number(parseFloat(vl_DebitLocaddnew * vl_ExchangeRateaddnew), '0,000.00'));
        } else {
            Ext.getCmp(prototype.idadjaddnew + '-de-DebitRevaddnew').setValue(0);
        }
    },
    onChkModify2: function (obj) {
        if (obj) {
            var vl_DebitLocaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditLocaddnew').getValue());
            var vl_ExchangeRateaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-ExchangeRateaddnew').getValue());
            Ext.getCmp(prototype.idadjaddnew + '-de-CreditRevaddnew').setValue(Ext.util.Format.number(parseFloat(vl_DebitLocaddnew * vl_ExchangeRateaddnew), '0,000.00'));
        } else {
            Ext.getCmp(prototype.idadjaddnew + '-de-CreditRevaddnew').setValue(0);
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
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
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchAfterRender2: function (obj) {
        obj.setValue('ALL');
    },
    onBtnAccept: function () {
        var DataCombo = '';
        var me = this;
        rec = me.view.params.listAddNuewdatos;
        var grid02 = Ext.getCmp(prototype.idadjaddnew + '-de-gridCorrectData');
        var AccountNumber = Ext.getCmp(prototype.idadjaddnew + '-de-AccountNumber1').getValue();
        var Description1 = Ext.getCmp(prototype.idadjaddnew + '-de-Description1').getValue();
        var LIB1 = Ext.getCmp(prototype.idadjaddnew + '-de-LIB1').getValue();
        var Concept1 = Ext.getCmp(prototype.idadjaddnew + '-de-Concept1addnew').getValue();
        var Concept2 = Ext.getCmp(prototype.idadjaddnew + '-de-Concept2addnew').getValue();
        var Concept3 = Ext.getCmp(prototype.idadjaddnew + '-de-Concept3addnew').getValue();
        var DocOracle = Ext.getCmp(prototype.idadjaddnew + '-de-DocOracle').getValue();
        var Client = Ext.getCmp(prototype.idadjaddnew + '-de-Client').getValue();
        var Provider = Ext.getCmp(prototype.idadjaddnew + '-de-Provider').getValue();
        var Adress = Ext.getCmp(prototype.idadjaddnew + '-de-Adress').getValue();
        var CurrLocaddnew = Ext.getCmp(prototype.idadjaddnew + '-de-CurrLocaddnew').getValue();
        var CIA1 = Ext.getCmp(prototype.idadjaddnew + '-de-CIA1').getValue();
        var DebitLocaddnew = 0;
        var CreditLocaddnew = 0;
        var DebitRevaddnew = 0;
        var CreditRevaddnew = 0;
        var total = 0;

        if (rec.opt !== '') {
            if (rec.opt === '1') {
                DataCombo = 'S';
            } else if (rec.opt === '2' || rec.opt === '6') {
                DataCombo = 'J';
            } else if (rec.opt === '3' || rec.opt === '7') {
                DataCombo = 'R';
            } else if (rec.opt === '5' || rec.opt === '13') {
                DataCombo = 'F';
            } else if (rec.opt === '9') {
                DataCombo = 'C';
            } else if (rec.opt === '8') {
                DataCombo = 'L';
            } else if (rec.opt === '10') {
                DataCombo = 'L';
            } else if (rec.opt === '4') {
                DataCombo = 'M';
            } else {
                DataCombo = 'OP';
            }
        }

        if (AccountNumber === '') {
            Ext.getCmp(prototype.idadjaddnew + '-de-AccountNumber1').focus();
            global.Msg({msg: 'Required Field, Must enter the account number'});
            return;
        }
        if (Ext.String.trim(AccountNumber).length !== 36) {
            Ext.getCmp(prototype.idadjaddnew + '-de-AccountNumber1').focus();
            global.Msg({msg: 'Required Field, The account number must be 35 characters'});
            return;
        }
        if (Description1 === '') {
            Ext.getCmp(prototype.idadjaddnew + '-de-Description1').focus();
            global.Msg({msg: 'Required Field, Must enter the account description'});
            return;
        }
        if (Ext.String.trim(Description1).length > 30) {
            Ext.getCmp(prototype.idadjaddnew + '-de-Description1').focus();
            global.Msg({msg: 'Required Field, the account description must be 30 characters'});
            return;
        }
        if (LIB1 === '') {
            Ext.getCmp(prototype.idadjaddnew + '-de-LIB1').focus();
            global.Msg({msg: 'Required Field, Must enter the lib1'});
            return;
        }
        if (rec.opt !== '13' && rec.opt !== '5' && rec.opt !== '8' && rec.opt !== '10' && rec.opt !== '11') {
            if (Concept1 === '') {
                Ext.getCmp(prototype.idadjaddnew + '-de-Concept1addnew').focus();
                global.Msg({msg: 'Required Field, Must enter the concept 1'});
                return;
            }
            if (Concept2 === '') {
                Ext.getCmp(prototype.idadjaddnew + '-de-Concept2addnew').focus();
                global.Msg({msg: 'Required Field, Must enter the concept 2 or 3'});
                return;
            }
            if (LIB1 === 'AR') {
                if (DocOracle === '') {
                    Ext.getCmp(prototype.idadjaddnew + '-de-DocOracle').focus();
                    global.Msg({msg: 'Required Field, For files AR , the doc. oracle must be filled ' + AccountNumber});
                    return;
                }
            }
        }
        total = (parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitLocaddnew').getValue().replace(new RegExp(',', 'g'), '')) + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditLocaddnew').getValue().replace(new RegExp(',', 'g'), '')) + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitRevaddnew').getValue().replace(new RegExp(',', 'g'), '')) + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditRevaddnew').getValue().replace(new RegExp(',', 'g'), '')));// + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditLocaddnew').getValue().replace(new RegExp(',', 'g'), '')) + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitRevaddnew').getValue().getValue().replace(new RegExp(',', 'g'), '')) + parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditRevaddnew').getValue().getValue().replace(new RegExp(',', 'g'), '')));
        DebitLocaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitLocaddnew').getValue().replace(new RegExp(',', 'g'), ''));
        CreditLocaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditLocaddnew').getValue().replace(new RegExp(',', 'g'), ''));
        DebitRevaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-DebitRevaddnew').getValue().replace(new RegExp(',', 'g'), ''));
        CreditRevaddnew = parseFloat(Ext.getCmp(prototype.idadjaddnew + '-de-CreditRevaddnew').getValue().replace(new RegExp(',', 'g'), ''));
        if (total === 0) {
            global.Msg({msg: 'Required Field, You must enter some amount '});
            return;
        }
        if ((DebitLocaddnew + CreditLocaddnew) === 0) {
            global.Msg({msg: 'Required Field, Credit and debit should have their amounts '});
            return;
        }
        if ((DebitRevaddnew + CreditRevaddnew) === 0) {
            global.Msg({msg: 'Required Field, The rev credit and debit should have their amounts '});
            return;
        }
        if (rec.opt === '10' && rec.opt === '11') {
            if (Provider === '') {
                Ext.getCmp(prototype.idadjaddnew + '-de-Provider').focus();
                global.Msg({msg: 'Required Field, For files AR , Must enter the provider'});
                return;
            }
        }
        global.Msg({
            msg: 'Are you sure to add the row ?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanDatos = {};
                    beanDatos.A1716CUPON = rec.CPN;
                    beanDatos.A1716MODO = DataCombo;
                    beanDatos.A1716CUR = CurrLocaddnew;
                    if (rec.opt === '13' || rec.opt === '5') {
                        if (Ext.String.trim(CurrLocaddnew) === '') {
                            beanDatos.A1716CUR = 'USD';
                        }
                    }
                    if (rec.opt === '8' || rec.opt === '10') {
                        if (Ext.String.trim(CurrLocaddnew) === '') {
                            beanDatos.A1716CUR = 'USD';
                        } else {
                            beanDatos.A1716CUR = CurrLocaddnew;
                        }
                    }
                    beanDatos.A1716FUENT = Ext.String.trim(rec.FUENT);
                    beanDatos.A1716SUBFU = Ext.String.trim(rec.SUBFU);
                    beanDatos.A1716CUENT = AccountNumber;

                    beanDatos.A1716ACTIV = DebitLocaddnew;
                    beanDatos.A1716PASIV = CreditLocaddnew;
                    beanDatos.ACTIV2 = DebitRevaddnew;
                    beanDatos.PASIV2 = CreditRevaddnew;
                    /*if (Concept1 === 'FP') {
                     beanDatos.A1716ACTIV = DebitLocaddnew; //txtA1939DEBLOC
                     beanDatos.A1716PASIV = CreditLocaddnew;//txtA1939CRELOC
                     beanDatos.ACTIV2 = DebitRevaddnew;//txtA1939DEBREV 
                     beanDatos.PASIV2 = CreditRevaddnew;//txtA1939CREREV
                     }*/


                    beanDatos.A1716TITU = Ext.String.trim(Description1);
                    beanDatos.A1716COPE = '';

                    beanDatos.A1716CLIEN = Ext.String.trim(Client);
                    beanDatos.A1716PROV = Ext.String.trim(Provider);
                    beanDatos.A1716DIREC = Ext.String.trim(Adress);
                    beanDatos.A1716FILE = Ext.String.trim(LIB1);
                    beanDatos.A1716FP = Ext.String.trim(Concept1);
                    beanDatos.CONP1 = Ext.String.trim(Concept1);
                    beanDatos.CONP2 = Ext.String.trim(Concept2);
                    beanDatos.CONP3 = Ext.String.trim(Concept3);

                    beanDatos.A1716TARJ = Ext.String.trim(rec.ttarjeta);
                    beanDatos.A1716NTARJ = Ext.String.trim(rec.Ntarjeta);
                    beanDatos.A1716TIDOC = Ext.String.trim(rec.Tdoc);
                    beanDatos.ORAC = Ext.String.trim(DocOracle);
                    beanDatos.A1716ORIG = '';
                    if (rec.SET !== '') {
                        beanDatos.A1716SEQT = Ext.String.trim(rec.SET);
                    } else {
                        beanDatos.A1716SEQT = '00';
                    }
                    beanDatos.A1530POLIZA = '';
                    beanDatos.LIB1 = Ext.String.trim(LIB1);
                    beanDatos.A1716RFIC = Ext.String.trim(rec.Rfic);
                    beanDatos.A1716RFIS = Ext.String.trim(rec.Rfis);
                    beanDatos.A1716VRic = Ext.String.trim(rec.VRic);

                    beanDatos.LIB1CIA = Ext.String.trim(CIA1);
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
                    beanDatos.A1716MARCA = '';

                    beanDatos.COMB = rec.TCAMB;
                    if (Ext.getCmp(prototype.idadjaddnew + '-txtPTE').getValue()) {
                        beanDatos.A1716MARCA = 'PTE';
                    }
                    if (Ext.String.trim(Description1) === 'CUENTA CONTROL INGRESOS PRAXIS') {
                        beanDatos.A1716MARCA = 'PTE';
                    }
                    grid02.getStore().add(beanDatos);
                }
            }
        });



    }







});


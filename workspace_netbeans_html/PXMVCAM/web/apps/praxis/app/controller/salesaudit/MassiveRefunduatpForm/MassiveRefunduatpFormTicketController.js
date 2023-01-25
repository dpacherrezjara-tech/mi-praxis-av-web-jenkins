/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormTicketController',
    beanguardar: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MassiveRefunduatpForm',
    init: function (view) {
        var me = this;
    },
    onClickCancel: function (btn) {
        var me = this;
        me.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        me.onSumaTaxGrid();
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStores();
        me.onLoadData();
        me.onLoadDataGrid();
    },
    setStoresFilters: function () {
        var ComboEstatus = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-ComboCambio');

        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "M", "name": "MODIFIED"},
                {"code": "R", "name": "REJECT"}
            ]
        }));

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
        var grid02 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
        //
        var grid03 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop');
        var grid04 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid02'
        });

        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid04'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        //
        grid03.setStore(store03);
        grid04.setStore(store04);

    },
    onLoadData: function () {
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
        var grid02 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
        //
        var grid03 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop');
        var grid04 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax');
        var btnSave = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-Save');
        //
        var me = this;
        var vl_STAT = '';
        var vl_FLAG = '';
        rec = me.view.params.rec;
        switch (String(rec.get('A4076STAT'))) {
            case 'Y':
                vl_STAT = 'PENDING';
                break;
            case 'E':
                vl_STAT = 'ERROR BPO';
                break;
            case 'F':
                vl_STAT = 'CAPTURED BPO';
                break;
            case 'C':
                vl_STAT = 'CANC';
                break;
        }

        switch (String(rec.get('A4076FLAG'))) {
            case 'Y':
                vl_FLAG = 'PENDING';
                break;
            case 'A':
                vl_FLAG = 'APPROVED';
                break;
            case 'E':
                vl_FLAG = 'SALES DATE ERROR';
                break;
            case 'U':
                vl_FLAG = 'WITH USES';
                break;
            case 'D':
                vl_FLAG = 'DUPLICATE TICKET';
                break;
            case 'T':
                vl_FLAG = 'ATO ERROR';
                break;
            case 'B':
                vl_FLAG = 'TAX ERROR';
                break;
            case 'H':
                vl_FLAG = 'HIGHER AMOUNT FOR SALE';
                break;
            case 'M':
                vl_FLAG = 'MODIFIED';
                break;
            case 'R':
                vl_FLAG = 'REJECT';
                break;
             case 'C':
                vl_FLAG = 'TICKET DOES NOT EXIST';
                break;
            case 'I':
                vl_FLAG = 'INVALID CURRENCY';
                break;
            case 'G':
                vl_FLAG = 'INVALID IATA';
                break;
            case 'J':
                vl_FLAG = 'TICKET EXCH';
                break;
            case 'K':
                vl_FLAG = 'INVALID CPN';
                break;
        }
        if (String(rec.get('A4076STAT')) === 'F' || String(rec.get('A4076STAT')) === 'C') {
            grid03.show();
            grid04.show();
            //
            grid01.hide();
            grid02.hide();
            btnSave.hide();
        } else {
            if (String(rec.get('A4076FLAG')) === 'J' || String(rec.get('A4076FLAG')) === 'K' || String(rec.get('A4076FLAG')) === 'G' || String(rec.get('A4076FLAG')) === 'U' || String(rec.get('A4076FLAG')) === 'D' || String(rec.get('A4076FLAG')) === 'R' || String(rec.get('A4076FLAG')) === 'I') {
                grid03.show();
                grid04.show();
                //
                grid01.hide();
                grid02.hide();
                btnSave.hide();
            } else {
                grid03.hide();
                grid04.hide();
                //
                grid01.show();
                grid02.show();
                btnSave.show();
                //
                if (rec.get('A4076TYPE') === 'LAYOUT TOTAL') {
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setReadOnly(false);
                } else {
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setReadOnly(true);
                }
            }
        }

        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtGruop').setValue(rec.get('A4076GRUPO')); 
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtfolio').setValue(rec.get('A4076PREME') + '-' + rec.get('A4076ANIO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttkt').setValue(rec.get('A4076TICKET'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttrnc').setValue(rec.get('A4076TRNCU'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtType').setValue(rec.get('A4076TYPE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtBase').setValue(rec.get('A4076BASE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRefe').setValue(rec.get('A4076REFE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtStatus').setValue(vl_FLAG);
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtBPO').setValue(vl_STAT);
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtAudit').setValue(rec.get('A4076REGIS'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtIssdate').setValue(rec.get('A4076FVTA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtSystemDate').setValue(rec.get('A4076FREGI'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttidoc').setValue(rec.get('A4076TDOC'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-Argument').setValue(rec.get('A4076DESC'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtuse').setValue(rec.get('A4076USO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtcpn').setValue(rec.get('A4076CPN'));
        // montos
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFaremda').setValue(rec.get('A4076MDA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').setValue(Ext.util.Format.number(rec.get('A4076TARTK'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda').setValue(rec.get('A4076MONTT'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').setValue(Ext.util.Format.number(rec.get('A4076EQVTK'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A4076TTAX'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A4076NETO'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommi1').setValue(Ext.util.Format.number(rec.get('A4076COMI'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTcambi1').setValue(Ext.util.Format.number(rec.get('A4076TCMBC'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtToca1').setValue(Ext.util.Format.number(rec.get('A4076TAXCO'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTcambi2').setValue(Ext.util.Format.number(rec.get('A4076TCMBT'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalPraxis').setValue(Ext.util.Format.number(rec.get('A4076NETK'), '0,000.00'));
        //console.log(rec.get('A4076NETO'));
        //console.log(Ext.util.Format.number(rec.get('A4076NETO'), '0,000.00'));
        //me.onTotalRFND();
    },

    onLoadDataGrid: function () {
        var me = this;
        rec = me.view.params.rec;


        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchUATPRFNDetail/',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: Ext.String.trim(rec.get('A4076PREME')),
                IN_ANIO: Ext.String.trim(rec.get('A4076ANIO')),
                IN_CORR: rec.get('A4076CORR')
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                //

                if (String(rec.get('A4076STAT')) === 'F' || String(rec.get('A4076STAT')) === 'C') {
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().removeAll();
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().removeAll();
                    //
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop').getStore().removeAll();
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop').getStore().loadData(res.lst_FOP);

                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax').getStore().removeAll();
                    Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax').getStore().loadData(res.lst_TAXES);

                } else {
                    if (String(rec.get('A4076FLAG')) === 'E' || String(rec.get('A4076FLAG')) === 'U' || String(rec.get('A4076FLAG')) === 'D' || String(rec.get('A4076FLAG')) === 'R') {

                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().removeAll();
                        //
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop').getStore().loadData(res.lst_FOP);

                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax').getStore().loadData(res.lst_TAXES);
                    } else {
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridFop').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridTax').getStore().removeAll();
                        //
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().loadData(res.lst_FOP);

                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().removeAll();
                        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().loadData(res.lst_TAXES);

                    }
                }

            }
        });
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onClickSave: function (btn) {
        var me = this;
        rec = me.view.params.rec;

        var lstTaxes = new Array();
        var lstFop = new Array();
        var vl_netofop = 0;
        var txtRefe = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRefe').getValue();
        var txtIssdate = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtIssdate').getValue();
        var txttidoc = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttidoc').getValue();
        var ComboEstatus = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-ComboCambio').getValue();
        var txtArgument = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-Argument').getValue();
        var txttkt = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttkt').getValue();
        //
        var txtFaremda = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFaremda').getValue();
        var txtFare = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue().replaceAll(',', '');
        var txtEquivamda = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda').getValue();
        var txtFarEquiv = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue().replaceAll(',', '');
        var txtTotalTax = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue().replaceAll(',', '');
        var txtTotal = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').getValue().replaceAll(',', '');
        var txtTotalPRAXIS = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalPraxis').getValue().replaceAll(',', '');
        var TotalPRAXIS = (parseFloat(txtTotalPRAXIS));
        //
        var txtCommi1 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommi1').getValue().replaceAll(',', '');
        var txtToca1 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtToca1').getValue().replaceAll(',', '');
        //
        var vl_txttrnc = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttrnc').getValue();

        // validacion de la razon
        if (Ext.String.trim(txtArgument).length === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue argument');
            return;
        }
        //F CAPTURED BPO Y A APPROVED
        if (Ext.String.trim(ComboEstatus).length === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Select of Estatus ');
            return;
        }
        if (String(rec.get('A4076STAT')) === 'F' && String(rec.get('A4076FLAG')) === 'A') {
            Ext.Msg.alert('.: PRAXIS :.', 'It cannot be modified as it has captured usage in PRAXIS');
            return;
        }

        if (ComboEstatus === 'M') {
            // validaciones Taxes
            var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
            var gridTaxes = grid01.getStore().getCount();
            if (gridTaxes > 0) {
                for (var o = 0; o < gridTaxes; o++) {
                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A4078CDTAX')).length === 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter Code Tax');
                        return;
                    }

                    if (Ext.String.trim(grid01.getStore().getAt(o).get('A4078CDTAX')).length !== 0) {
                        if (Ext.String.trim(grid01.getStore().getAt(o).get('A4078CDTAX')) === 'XF' && Ext.String.trim(grid01.getStore().getAt(o).get('A4078CDATO')).length < 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport for tax XF');
                            return;
                        }
                    }
                }
            }
            // validaciones FOP
            var grid02 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
            var gridPAYMENT = grid02.getStore().getCount();
            //var gridPAYMENT = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().getCount();
            if (gridPAYMENT > 0) {
                for (var p = 0; p < gridPAYMENT; p++) {
                    if (Ext.String.trim(grid02.getStore().getAt(p).get('A4077CFOP')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                        return;
                    }
                    if (Ext.String.trim(grid02.getStore().getAt(p).get('A4077CFOP')) === 'CA') {
                        if (gridPAYMENT.getStore().getAt(p).get('A4077TYCAR') !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                            return;
                        }
                        if (Ext.String.trim(grid02.getStore().getAt(p).get('A4077NTARJ')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                            return;
                        }
                        if (parseFloat(grid02.getStore().getAt(p).get('A4077TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            return;
                        }
                        vl_netofop = (vl_netofop + parseFloat(grid02.getStore().getAt(p).get('A4077TOTAL')));


                    }
                    if (Ext.String.trim(grid02.getStore().getAt(p).get('A4077CFOP')) === 'CC' || Ext.String.trim(grid02.getStore().getAt(p).get('A4077CFOP')) === 'ET') {

                        if (grid02.getStore().getAt(p).get('A4077TYCAR') === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                            return;
                        }
                        if (Ext.String.trim(grid02.getStore().getAt(p).get('A4077NTARJ')) === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                            return;
                        }
                        if (grid02.getStore().getAt(p).get('A4077TYCAR') === 'BA' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'IK' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'DS' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'CA' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'VI' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'JC') {
                            if (Ext.String.trim(grid02.getStore().getAt(p).get('A3653NTARJ')).length < 16) {
                                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                                return;
                            }
                        }

                        if (grid02.getStore().getAt(p).get('A4077TYCAR') === 'AX' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'TP' || grid02.getStore().getAt(p).get('A4077TYCAR') === 'PP') {
                            if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length < 15) {
                                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                                return;
                            }
                        }
                        if (grid02.getStore().getAt(p).get('A4077TYCAR') === 'DC') {
                            if (Ext.String.trim(grid02.getStore().getAt(p).get('A3653NTARJ')).length < 14) {
                                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                                return;
                            }
                        }

                        if (parseFloat(grid02.getStore().getAt(p).get('A4077TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }
                        vl_netofop = (vl_netofop + parseFloat(grid02.getStore().getAt(p).get('A4077TOTAL')));

                    }
                }
                vl_netofop = (txtTotal - vl_netofop);
                if (Ext.String.trim(vl_txttrnc) !== 'EXCH') {
                    if (vl_netofop !== 0) {
                        Ext.Msg.alert('.: PRAXIS :.', 'the total fop must be equal to the total refund');
                        return;
                    }
                }

            }
            if (TotalPRAXIS > 0) {
                if (Ext.String.trim(vl_txttrnc) !== 'EXCH') {
                    if (parseFloat(txtTotal) > TotalPRAXIS) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The total to be RFND is greater than the amount in PRAXIS');
                        return;
                    }
                }
            }
        }

        //taxes
        /* var gridtax = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
         gridtax.store.data.each(function (rec) {
         lstTaxes.push({"A4078CORRL": rec.data.A4078CORRL, "A4078SEQ": rec.data.A4078SEQ, "A4078CDTAX": rec.data.A4078CDTAX, "A4078CDATO": rec.data.A4078CDATO, "A4078TXDIF": rec.data.A4078TXDIF, "A4078STAT": rec.data.A4078STAT});
         });
         //fop
         var gridfop = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
         gridfop.store.data.each(function (rec) {
         lstTaxes.push({"A4077CORRL": rec.data.A4077CORRL, "A4077SEQ": rec.data.A4077SEQ, "A4077CFOP": rec.data.A4077CFOP, "A4077TYCAR": rec.data.A4077TYCAR, "A4077NTARJ": rec.data.A4077NTARJ, "A4077TOTAL": rec.data.A4077TOTAL, "A4077FLAG": rec.data.A4077FLAG});
         });*/

        for (var i = 0; i < Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().data.length; i++) {
            var bean = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().data.items[i].data;
            lstTaxes.push(bean);
        }
        for (var i = 0; i < Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().data.length; i++) {
            var bean = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().data.items[i].data;
            lstFop.push(bean);
        }

        me.beanguardar.A4076PREME = Ext.String.trim(rec.get('A4076PREME'));
        me.beanguardar.A4076ANIO = Ext.String.trim(rec.get('A4076ANIO'));
        me.beanguardar.A4076CORR = rec.get('A4076CORR');
        //
        me.beanguardar.A4076REFE = Ext.String.trim(txtRefe);
        me.beanguardar.A4076FVTA = Ext.String.trim(txtIssdate);
        me.beanguardar.A4076TDOC = Ext.String.trim(txttidoc);
        me.beanguardar.A4076MDA = Ext.String.trim(txtFaremda);
        me.beanguardar.A4076TARTK = Ext.String.trim(txtFare);
        me.beanguardar.A4076MONTT = Ext.String.trim(txtEquivamda);
        me.beanguardar.A4076EQVTK = txtFarEquiv;
        me.beanguardar.A4076TTAX = txtTotalTax;
        me.beanguardar.A4076NETO = txtTotal;
        me.beanguardar.A4076COMI = txtCommi1;
        me.beanguardar.A4076TAXCO = txtToca1;
        me.beanguardar.IN_STATUS = Ext.String.trim(ComboEstatus);
        me.beanguardar.A4076DESC = Ext.String.trim(txtArgument);
        me.beanguardar.IN_TICKET = Ext.String.trim(txttkt);
        // me.beanguardar.A4076NETK = txtTotalPRAXIS;


        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win'), {
            msg: 'Please Wait....'
        });
        mask.show();
        //
        Ext.Ajax.request({
            url: me.urlWin01 + '/ProcesaManualUATP/',
            timeout: 60000000,
            method: 'POST',
            params: {beanString: JSON.stringify(me.beanguardar),
                beanlstTaxes: JSON.stringify(lstTaxes),
                beanlstlstFop: JSON.stringify(lstFop)
            },
            success: function (response, options) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res.data);
                var vp_icon = 0;
                if (res.data === 'RECORD INSERTED' || res.data === 'With uses verify') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').close();
                            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor').getController().onSearchClick();
                        }


                    }});
            }
        });


    },
    onAddFopClick: function (rec) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
        var beanDatos = {};
        beanDatos.A4077CFOP = '';
        beanDatos.A4077TYCAR = '';
        beanDatos.A4077NTARJ = '';
        beanDatos.A4077TOTAL = 0;
        beanDatos.A4077CORRL = '0';
        beanDatos.A4077SEQ = '0';
        beanDatos.A4077FLAG = 'M';
        grid01.getStore().add(beanDatos);
    },
    onDeleteFopClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var recdato = store.getAt(rowIndex);
        var paramsGuardarFOP = {};
        //
        rec = me.view.params.rec;

        global.Msg({
            msg: 'Delete FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (recdato.data.A4077FLAG !== 'M') {
                        paramsGuardarFOP.IN_OPTION = "1";
                        paramsGuardarFOP.IN_PREME = Ext.String.trim(rec.get('A4076PREME'));
                        paramsGuardarFOP.IN_ANIO = Ext.String.trim(rec.get('A4076ANIO'));
                        paramsGuardarFOP.IN_CORR = Ext.String.trim(recdato.data.A4077CORRL);
                        paramsGuardarFOP.IN_SEQ = Ext.String.trim(recdato.data.A4077SEQ);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDelete/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarFOP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                }
            }
        });

    },
    OnAddTaxRenderer: function (rec) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
        var beanDatos = {};
        beanDatos.A4078CDTAX = '';
        beanDatos.A4078CDATO = '';
        beanDatos.A4078TXDIF = 0;
        beanDatos.A4078CORRL = '0';
        beanDatos.A4078SEQ = '0';
        beanDatos.A4078STAT = 'M';
        grid01.getStore().add(beanDatos);
    },
    onDeleteTaxClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var recdato = store.getAt(rowIndex);
        rec = me.view.params.rec;
        var paramsGuardarTax = {};
        global.Msg({
            msg: 'Delete Tax?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (recdato.data.A4078STAT !== 'M') {
                        paramsGuardarTax.IN_OPTION = "2";
                        paramsGuardarTax.IN_PREME = Ext.String.trim(rec.get('A4076PREME'));
                        paramsGuardarTax.IN_ANIO = Ext.String.trim(rec.get('A4076ANIO'));
                        paramsGuardarTax.IN_CORR = Ext.String.trim(recdato.data.A4078CORRL);
                        paramsGuardarTax.IN_SEQ = Ext.String.trim(recdato.data.A4078SEQ);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDelete/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTax)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                    me.onSumaTaxGrid();
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                }
            }
        });
        me.onSumaTaxGrid();
    },
    onSumaTaxGrid: function () {
        var me = this;
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');
        var regs = grid01.getStore().getCount();
        var Total = 0;
        var monto = 0;
        for (var i = 0; i < regs; i++) {
            monto = grid01.getStore().getAt(i).get('A4078TXDIF');
            Total += parseFloat(monto);
        }
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').setValue(Ext.util.Format.number(Total, '0,000.00'));
        //console.log(Total);
        me.onTotalRFND();
    },
    onTotalRFND: function () {
        if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue() === '') {
            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').setValue('0.00');
        }
        if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue() === '') {
            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').setValue('0.00');
        }
        if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue() === '') {
            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').setValue('0.00');
        }


        var txtFareto = 0;
        var txtFare = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue().replaceAll(',', '');
        var txtFarEquiv = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue().replaceAll(',', '');
        var txtTotalTax = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue().replaceAll(',', '');

        if (parseFloat(txtFarEquiv) > 0) {
            txtFareto = txtFarEquiv;
        } else {
            txtFareto = txtFare;
        }
        var total = (parseFloat(txtFareto) + parseFloat(txtTotalTax));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setValue(Ext.util.Format.number((total), '0,000.00'));
    },
    onSearchkey: function (f, e) {
        //alert(e.getKey());
        if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {


            if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue() === '') {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').setValue('0.00');
            }
            if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue() === '') {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').setValue('0.00');
            }
            if (Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue() === '') {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').setValue('0.00');
            }


            var txtFareto = 0;
            var txtFare = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue().replaceAll(',', '');
            var txtFarEquiv = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue().replaceAll(',', '');
            var txtTotalTax = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue().replaceAll(',', '');
            if (txtFarEquiv > 0) {
                txtFareto = txtFarEquiv;
            } else {
                txtFareto = txtFare;
            }
            var total = (parseFloat(txtFareto) + parseFloat(txtTotalTax));
            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setValue(Ext.util.Format.number((total), '0,000.00'));
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSeguimietoClick: function (grid, rowIndex, colIndex) {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormErrorBPO({
            params: {
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    }

});


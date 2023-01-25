/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailTicketController',
    beanINI: {},
    beanIniTem: {},
    beanHistorical: {},
    lsta_Documents: 0,
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/RFNDPending',
    urlWin02: CONTEXTPATH + '/RFNDQuery',
    //prototype.url02 = CONTEXTPATH + '/RFNDPending';
    //prototype.url01 = CONTEXTPATH + '/RFNDQuery';
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //var txtadd = Ext.getCmp(prototype.idDetailTicket + '-txtadd');
        var txtCpn1 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn1');
        var txtCpn2 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn2');
        var txtCpn3 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn3');
        var txtCpn4 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn4');
        var CbtStatus = Ext.getCmp(prototype.idDetailTicket + '-ComboStatus');
        var save = Ext.getCmp(prototype.idDetailTicket + '-btn-save');
        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':
                // txtadd.hide();
                txtCpn1.disable();
                txtCpn2.disable();
                txtCpn3.disable();
                txtCpn4.disable();
                CbtStatus.hide();
                save.hide();
                Ext.getCmp(prototype.idDetailTicket + '-CmbConto').setReadOnly(true);
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').setReadOnly(true);
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').setReadOnly(true);
                Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND').setReadOnly(true);
                //Ext.getCmp(prototype.idDetailTicket + '-win').setHeight(Ext.getCmp(prototype.idDetailTicket + '-win').getHeight() - 200);
                break;
            case 'FORMPENDIRFND':
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').setReadOnly(false);
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').setReadOnly(false);
                if (String(this.view.params.qtytkt) > 1) {
                    //txtadd.show();
                    CbtStatus.show();
                }

                //txtadd.show();
                txtCpn1.enable();
                txtCpn2.enable();
                txtCpn3.enable();
                txtCpn4.enable();
                Ext.getCmp(prototype.idDetailTicket + '-CmbConto').setReadOnly(false);
                Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND').setReadOnly(false);
                save.show();
                break;

        }
        // this.CleanFields();
        this.setStores();
        this.setStoresFilters();
        this.onLoadDataGrid();
        this.onLoadDataQuery();


    },
    onLoadDataGrid: function () {
        Ext.getCmp(prototype.idDetailTicket + '-gridTaxesADD').show();
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.idDetailTicket + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin02 + '/SearchQueryRFNDetailTCKT',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: rec.get('A3648PREME'),
                IN_ANIO: rec.get('A3648ANIO'),
                IN_CIA: Ext.String.trim(rec.get('A3648CIA')),
                IN_FORMA: Ext.String.trim(rec.get('A3648FORMA')),
                IN_SERIE: Ext.String.trim(rec.get('A3648SERIE')),
                IN_SEQ: Ext.String.trim(rec.get('A3648SEQ')),
                IN_CORRL: Ext.String.trim(rec.get('A3648CORRL'))
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idDetailTicket + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idDetailTicket + '-gridCPN').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridCPN').getStore().loadData(res.lsta_COUPNS);
                Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENTQUERY').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt').getStore().loadData(res.lst_RAZON);
                //usos cupon
                Ext.getCmp(prototype.idDetailTicket + '-gridDataStatus').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridDataStatus').getStore().loadData(res.lsta_USOS);
                if (me.view.params.action === 'FORMQUERYRFND') {
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT').hide();
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENTQUERY').show();
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENTQUERY').getStore().loadData(res.lsta_Card);
                    //taxes
                    Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').hide();
                    Ext.getCmp(prototype.idDetailTicket + '-gridListTaxes').show();
                    Ext.getCmp(prototype.idDetailTicket + '-gridListTaxes').getStore().removeAll();
                    Ext.getCmp(prototype.idDetailTicket + '-gridListTaxes').getStore().loadData(res.lsta_TAXESAM);
                } else {
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENTQUERY').hide();
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT').show();
                    Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT').getStore().loadData(res.lsta_Card);
                    //taxes
                    Ext.getCmp(prototype.idDetailTicket + '-gridListTaxes').hide();
                    Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').show();
                    Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').getStore().removeAll();
                    Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').getStore().loadData(res.lsta_TAXESAM);

                }
                me.beanHistorical = res.lsta_HISTORY;
                me.lsta_Documents = res.lsta_DOCUMENTS.length;

                switch (String(me.view.params.action)) {
                    case 'FORMQUERYRFND':
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').hide();
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').hide();
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').hide();
                        if (Ext.String.trim(rec.get('A3648CPN1D')) !== '') {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN2D')) !== '') {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN3D')) !== '') {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN4D')) !== '') {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').setValue(true);
                        }
                        break;
                    case 'FORMPENDIRFND':

                        if (res.lsta_COUPNS.length > 0) {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').hide();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').hide();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').hide();

                            for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '1') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '2') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '3') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '4') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').show();
                                    me.totalcpn += 1;
                                }
                            }
                        } else {
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').show();
                        }
                        //
                        for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '1') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '2') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '3') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '4') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                        }
                        /* if (res.lsta_COUPNS.length > 0) {
                         if (me.totalcpn === 0) {
                         Ext.getCmp(prototype.idDetailTicket + '-txtusoCpn').show();
                         }
                         } else {
                         Ext.getCmp(prototype.idDetailTicket + '-txtusoCpn').hide();
                         }*/

                        ///para habilitar los cupones
                        var tidoc = Ext.getCmp(prototype.idDetailTicket + '-txttidoc').getValue();
                        if (tidoc !== '') {
                            if (tidoc.substring(0, 3) === 'EMD') {
                                Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').show();
                                //
                                Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').hide();
                                Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').hide();
                                Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').hide();
                                Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').hide();
                            }
                        } else {
                            Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').hide();
                            //
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').show();
                            Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').show();
                        }
                        break;

                }



            }
        });
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(Ext.String.trim(record.get('A3653FLAG')))) {
            case 'I':
                value = 'silver';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onLoadDataQuery: function () {
        var me = this;
        rec = me.view.params.rec;
        var gridRazonesTkt = Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt');
        if (me.view.params.action === 'FORMQUERYRFND') {
            gridRazonesTkt.columns[2].setVisible(false);
            gridRazonesTkt.on('beforeedit', function (event) {
                return false;
            }, gridRazonesTkt);
            Ext.getCmp(prototype.idDetailTicket + '-txtRazonesadd').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setReadOnly(true);
            Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').setReadOnly(true);
            Ext.getCmp(prototype.idDetailTicket + '-txtmda').setReadOnly(true);
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setReadOnly(true);

        } else {
            Ext.getCmp(prototype.idDetailTicket + '-txtRazonesadd').show();
            Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').show();
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setReadOnly(false);
            Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').setReadOnly(false);
            Ext.getCmp(prototype.idDetailTicket + '-txtmda').setReadOnly(false);
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setReadOnly(false);
        }

        Ext.getCmp(prototype.idDetailTicket + '-txtfolio').setValue(rec.get('A3648FOLIO'));
        Ext.getCmp(prototype.idDetailTicket + '-txttkt').setValue(rec.get('A3648TICKET'));
        Ext.getCmp(prototype.idDetailTicket + '-txttidoc').setValue(rec.get('A3648STDOC'));
        Ext.getCmp(prototype.idDetailTicket + '-txtcpn').setValue(rec.get('A3648CUPON'));
        Ext.getCmp(prototype.idDetailTicket + '-txttrnc').setValue(rec.get('A3648STRCU'));
        Ext.getCmp(prototype.idDetailTicket + '-txtIssdate').setValue(rec.get('A3648XFSAL'));
        Ext.getCmp(prototype.idDetailTicket + '-txtpnr').setValue(rec.get('A3648XPNR'));
        Ext.getCmp(prototype.idDetailTicket + '-txtzone').setValue(rec.get('A3648ARCD'));
        Ext.getCmp(prototype.idDetailTicket + '-CmbConto').setValue(Ext.String.trim(rec.get('A3648CONJT')));
        Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND').setValue(Ext.String.trim(rec.get('A3648TRFND')));
        Ext.getCmp(prototype.idDetailTicket + '-txtCase').setValue(Ext.String.trim(rec.get('A3648SFW')));
        Ext.getCmp(prototype.idDetailTicket + '-txtEndorse').setValue(rec.get('A3648XENDR'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDetailTicket + '-txtEndorse',
            html: '' + Ext.String.trim(rec.get('A3648XENDR'))
        });

        Ext.getCmp(prototype.idDetailTicket + '-txtReqReason').setValue(rec.get('A3648ERROR'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDetailTicket + '-txtReqReason',
            html: '' + Ext.String.trim(rec.get('A3648ERROR'))
        });
        Ext.getCmp(prototype.idDetailTicket + '-txtRemarks').setValue(rec.get('A3648RAAG'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDetailTicket + '-txtRemarks',
            html: '' + Ext.String.trim(rec.get('A3648RAAG'))
        });
        Ext.getCmp(prototype.idDetailTicket + '-txtpax').setValue(rec.get('A3648SPAX'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDetailTicket + '-txtpax',
            html: '' + Ext.String.trim(rec.get('A3648SPAX'))
        });

        Ext.getCmp(prototype.idDetailTicket + '-txtrefundable').setValue(rec.get('A3648XRDBE'));
        Ext.getCmp(prototype.idDetailTicket + '-txtRfndFee').setValue(rec.get('A3648XFEE'));

        Ext.getCmp(prototype.idDetailTicket + '-txtiata').setValue(rec.get('A3648SIATA'));
        Ext.getCmp(prototype.idDetailTicket + '-txtCOUNTRY').setValue(rec.get('A3648SPVTA'));
        var vl_A3648FLAG = '';
        switch (Ext.String.trim(rec.get('A3648FLAG'))) {
            case 'E':
                vl_A3648FLAG = 'ERROR PROCESS';
                break;
            case 'A':
                vl_A3648FLAG = 'IN PROCESS';
                break;
            case 'R':
                vl_A3648FLAG = 'REJECTED';
                break;
            case 'F':
                vl_A3648FLAG = 'AUTHORISED';
                break;
            case 'C':
                vl_A3648FLAG = 'REACTIVATION';
                break;
            case 'B':
                vl_A3648FLAG = 'GIVE USE IN PRAXIS';
                break;
            case 'Y':
                vl_A3648FLAG = 'PENDING';
                break;
        }
        Ext.getCmp(prototype.idDetailTicket + '-txtStatus').setValue(rec.get('A3648STATO'));
        Ext.getCmp(prototype.idDetailTicket + '-txtFlag').setValue(vl_A3648FLAG);
        if ((Ext.String.trim(rec.get('A3648FLAG')) === 'F' || Ext.String.trim(rec.get('A3648FLAG')) === 'R' || Ext.String.trim(rec.get('A3648FLAG')) === 'B') && Ext.String.trim(rec.get('A3647REGAS')) === 'AUTOPR') {
            Ext.getCmp(prototype.idDetailTicket + '-btn-save').hide();
        }
        if (Ext.String.trim(rec.get('A3648FLAG')) === 'F' || Ext.String.trim(rec.get('A3648FLAG')) === 'B') {
            if (rec.get('A3648MARCA') === 'Y') {
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').setValue(true);
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').setValue(false);
            }
            if (rec.get('A3648MARCA') === 'N') {
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').setValue(false);
                Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').setValue(true);
            }
        }

        Ext.getCmp(prototype.idDetailTicket + '-txtFareCal').setValue(rec.get('A3648XFARC'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDetailTicket + '-txtFareCal',
            html: '' + Ext.String.trim(rec.get('A3648XFARC'))
        });
        // suma
        //fare 
        Ext.getCmp(prototype.idDetailTicket + '-txtFare').setValue(Ext.util.Format.number(rec.get('A3648STARF'), '0,000.00'));
        Ext.getCmp(prototype.idDetailTicket + '-txtFareXml').setValue(Ext.util.Format.number(rec.get('A3648XTARF'), '0,000.00'));
        //fare  equi
        Ext.getCmp(prototype.idDetailTicket + '-txtFareEq').setValue(Ext.util.Format.number(rec.get('A3648STARQ'), '0,000.00'));
        Ext.getCmp(prototype.idDetailTicket + '-txtFareEqXml').setValue(Ext.util.Format.number(rec.get('A3648XTARQ'), '0,000.00'));
        //tax
        Ext.getCmp(prototype.idDetailTicket + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A3648STTAX'), '0,000.00'));
        Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxXml').setValue(Ext.util.Format.number(rec.get('A3648XTTAX'), '0,000.00'));
        //comi
        Ext.getCmp(prototype.idDetailTicket + '-txtCommission').setValue(Ext.util.Format.number(rec.get('A3648SCOMI'), '0,000.00'));
        Ext.getCmp(prototype.idDetailTicket + '-txtCommissionXml').setValue(Ext.util.Format.number(rec.get('A3648XCOMI'), '0,000.00'));
        // total
        Ext.getCmp(prototype.idDetailTicket + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A3648STOTL'), '0,000.00'));
        Ext.getCmp(prototype.idDetailTicket + '-txtTotalXml').setValue(Ext.util.Format.number(rec.get('A3648XTOTL'), '0,000.00'));
        if (Ext.String.trim(rec.get('A3648FLAG')) === 'F' || Ext.String.trim(rec.get('A3648FLAG')) === 'R' || Ext.String.trim(rec.get('A3648FLAG')) === 'B') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(rec.get('A3648TARID'));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setValue(rec.get('A3648STAQD'));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAXD'), '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtCommissionAm').setValue(Ext.util.Format.number(rec.get('A3648COMID'), '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAD'), '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').setValue(rec.get('A3648MDAQD'));
            Ext.getCmp(prototype.idDetailTicket + '-txtmda').setValue(rec.get('A3648MDAD'));
        } else {
            var VL_A3648STARF = 0;
            var VL_A3648XTARQ = 0;
            var VL_A3648STTAX = 0;
            var VL_A3648SCOMI = 0;
            var VL_A3648STOTL = 0;
            var VL_A3648XMDA = '';
            var VL_A3648XMDAQ = '';
            //
            if (rec.get('A3648STARF') > 0) {
                VL_A3648STARF = rec.get('A3648STARF');
            } else {
                VL_A3648STARF = rec.get('A3648XTARF');
            }
            if (rec.get('A3648STARQ') > 0) {
                VL_A3648XTARQ = rec.get('A3648STARQ');
            } else {
                VL_A3648XTARQ = rec.get('A3648XTARQ');
            }
            if (rec.get('A3648STTAX') > 0) {
                VL_A3648STTAX = rec.get('A3648STTAX');
            } else {
                VL_A3648STTAX = rec.get('A3648XTTAX');
            }
            if (rec.get('A3648STOTL') > 0) {
                // VL_A3648XMDA = rec.get('A3648SMDA');
                // VL_A3648XMDAQ = rec.get('A3648SMDAQ');
                VL_A3648STOTL = rec.get('A3648STOTL');
            } else {
                // VL_A3648XMDA = rec.get('A3648XMDA');
                // VL_A3648XMDAQ = rec.get('A3648XMDAQ');
                VL_A3648STOTL = rec.get('A3648XTOTL');
            }
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(VL_A3648STARF);
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setValue(VL_A3648XTARQ);
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(VL_A3648STTAX, '0,000.00'));
            //Ext.getCmp(prototype.idDetailTicket + '-txtCommissionAm').setValue(Ext.util.Format.number(rec.get('A3648SCOMI'), '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number(VL_A3648STOTL, '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').setValue(rec.get('A3648MDAQD'));
            Ext.getCmp(prototype.idDetailTicket + '-txtmda').setValue(rec.get('A3648MDAD'));
            //Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').setValue(VL_A3648XMDAQ);
            //Ext.getCmp(prototype.idDetailTicket + '-txtmda').setValue(VL_A3648XMDA);
        }

        if (Ext.String.trim(rec.get('A3648ARCHI')) !== '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtImageView').show();
        } else {
            Ext.getCmp(prototype.idDetailTicket + '-txtImageView').hide();
        }
        //



    },
    onImageViewClick: function () {
        // 139 - 0370663898
        // console.log(rec.get('A3389FREGI') + '-' + rec.get('A3389PAIS') + '-' + rec.get('A3389NUMER'));
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.RFNDDIRFileViewer({
            params: {
                rec: me.view.params.rec
            }
        });
        win.show();
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idDetailTicket + '-gridCPN');
        var grid02 = Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT');
        var grid03 = Ext.getCmp(prototype.idDetailTicket + '-gridListTaxes');
        var grid04 = Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt');
        var grid05 = Ext.getCmp(prototype.idDetailTicket + '-gridTaxes');
        var grid06 = Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENTQUERY');
        var grid07 = Ext.getCmp(prototype.idDetailTicket + '-gridDataStatus');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid04'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid05'
        });
        var store06 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid06'
        });
        var store07 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDetailTicket + '-store-grid07'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);
        grid06.setStore(store06);
        grid07.setStore(store07);

    },
    onAddFopClick: function (rec) {
        var me = this;
        var txtmdatax = '';
        var txtmda = (Ext.getCmp(prototype.idDetailTicket + '-txtmda').getValue().trim());
        var txtEqmda = (Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').getValue().trim());
        if (txtEqmda !== '') {
            txtmdatax = txtEqmda;
        } else {
            txtmdatax = txtmda;
        }
        if (txtmdatax === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the currency');
            return;
        }
        rec = me.view.params.rec;

        var grid01 = Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT');
        var beanDatos = {};
        beanDatos.A3653PREME = rec.get('A3648PREME');
        beanDatos.A3653ANIO = rec.get('A3648ANIO');
        beanDatos.A3653CIA = Ext.String.trim(rec.get('A3648CIA'));
        beanDatos.A3653FORMA = Ext.String.trim(rec.get('A3648FORMA'));
        beanDatos.A3653SERIE = Ext.String.trim(rec.get('A3648SERIE'));
        beanDatos.A3653SEQ = Ext.String.trim(rec.get('A3648SEQ'));
        beanDatos.A3653CORRL = '';
        beanDatos.A3653CFOP = '';
        beanDatos.A3653TYCAR = '';
        beanDatos.A3653NTARJ = '';
        beanDatos.A3653FEXP = '';
        beanDatos.A3653CAPL = '';
        beanDatos.A3653TOTAL = 0;
        beanDatos.A3653TYPE = 'AE';
        grid01.getStore().add(beanDatos);
    },
    OnAddTaxRenderer: function (rec) {
        var me = this;
        var txtmdatax = '';
        var txtmda = (Ext.getCmp(prototype.idDetailTicket + '-txtmda').getValue().trim());
        var txtEqmda = (Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').getValue().trim());
        if (txtEqmda !== '') {
            txtmdatax = txtEqmda;
        } else {
            txtmdatax = txtmda;
        }
        if (txtmdatax === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the currency');
            return;
        }
        rec = me.view.params.rec;

        var grid01 = Ext.getCmp(prototype.idDetailTicket + '-gridTaxes');
        var beanDatos = {};
        beanDatos.A3652PREME = rec.get('A3648PREME');
        beanDatos.A3652ANIO = rec.get('A3648ANIO');
        beanDatos.A3652CIA = Ext.String.trim(rec.get('A3648CIA'));
        beanDatos.A3652FORMA = Ext.String.trim(rec.get('A3648FORMA'));
        beanDatos.A3652SERIE = Ext.String.trim(rec.get('A3648SERIE'));
        beanDatos.A3652SEQ = Ext.String.trim(rec.get('A3648SEQ'));
        beanDatos.A3652CDTAX = '';
        beanDatos.A3652CORRL = '';
        beanDatos.A3652TXDIF = 0;
        beanDatos.A3652APFC = '';
        beanDatos.A3652MONED = txtmdatax;
        grid01.getStore().add(beanDatos);
        me.onSumaTaxGrid();
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

        Ext.getCmp(prototype.idDetailTicket + '-win').mask('Please Wait....');


        /* cargar data*/
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchPostbillingDetail/',
            method: 'POST',
            timeout: '300000',
            params: me.beanINI,
            success: function (response, options) {
                Ext.getCmp(prototype.idDetailTicket + '-win').unmask();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.idDetailTicket + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridRazon').getStore().loadData(res.lst_DispuHisto);

                Ext.getCmp(prototype.idDetailTicket + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridTKT').getStore().loadData(res.lst_Tkts);

                Ext.getCmp(prototype.idDetailTicket + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.idDetailTicket + '-gridDispuRazon').getStore().loadData(res.lst_DispuPostbi);
            }
        });
        /*finde la carga*/
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    setStoresFilters: function () {
        var ComboEstatus = Ext.getCmp(prototype.idDetailTicket + '-ComboStatus');
        var CmbConto = Ext.getCmp(prototype.idDetailTicket + '-CmbConto');
        var CmbTRFND = Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND');
        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "C", "name": "REACTIVATION"}
            ]
        }));
        CmbConto.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "I", "name": "START"},
                {"code": "C", "name": "CONTINUATION"}
            ]
        }));
        CmbTRFND.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "P", "name": "PARTIAL"},
                {"code": "T", "name": "TOTAL"}
            ]
        }));

    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    OnFopRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarTAX = {};
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (Ext.String.trim(rec.data.A3653CORRL) !== '') {
                        paramsGuardarTAX.IN_OPTION = "3";
                        paramsGuardarTAX.A3652CCUST = Ext.String.trim(rec.data.A3653CCUST);
                        paramsGuardarTAX.A3652PREME = Ext.String.trim(rec.data.A3653PREME);
                        paramsGuardarTAX.A3652ANIO = Ext.String.trim(rec.data.A3653ANIO);
                        paramsGuardarTAX.A3652CIA = Ext.String.trim(rec.data.A3653CIA);
                        paramsGuardarTAX.A3652FORMA = Ext.String.trim(rec.data.A3653FORMA);
                        paramsGuardarTAX.A3652SERIE = Ext.String.trim(rec.data.A3653SERIE);
                        paramsGuardarTAX.A3652SEQ = Ext.String.trim(rec.data.A3653SEQ);
                        paramsGuardarTAX.A3652CORRL = Ext.String.trim(rec.data.A3653CORRL);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
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
    OnTaxRFNDRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarTAX = {};
        global.Msg({
            msg: 'DELETE TAX?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (Ext.String.trim(rec.data.A3652CORRL) !== '') {
                        paramsGuardarTAX.IN_OPTION = "1";
                        paramsGuardarTAX.A3652CIA = Ext.String.trim(rec.data.A3652CIA);
                        paramsGuardarTAX.A3652FORMA = Ext.String.trim(rec.data.A3652FORMA);
                        paramsGuardarTAX.A3652SERIE = Ext.String.trim(rec.data.A3652SERIE);
                        paramsGuardarTAX.A3652SEQ = Ext.String.trim(rec.data.A3652SEQ);
                        paramsGuardarTAX.A3652CORRL = Ext.String.trim(rec.data.A3652CORRL);
                        paramsGuardarTAX.A3652PREME = Ext.String.trim(rec.data.A3652PREME);
                        paramsGuardarTAX.A3652ANIO = Ext.String.trim(rec.data.A3652ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
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
                    me.onSumaTaxGrid();
                }
            }
        });

    },
    OnRazonRFNDRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarRazon = {};
        global.Msg({
            msg: 'DELETE Razon?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (Ext.String.trim(rec.data.A3649CORRL) !== '') {
                        paramsGuardarRazon.IN_OPTION = "2";
                        paramsGuardarRazon.A3652CIA = Ext.String.trim(rec.data.A3659CIA);
                        paramsGuardarRazon.A3652FORMA = Ext.String.trim(rec.data.A3659FORMA);
                        paramsGuardarRazon.A3652SERIE = Ext.String.trim(rec.data.A3659SERIE);
                        paramsGuardarRazon.A3652SEQ = Ext.String.trim(rec.data.A3659SEQ);
                        paramsGuardarRazon.A3652CORRL = Ext.String.trim(rec.data.A3649CORRL);
                        paramsGuardarRazon.A3652PREME = Ext.String.trim(rec.data.A3649PREME);
                        paramsGuardarRazon.A3652ANIO = Ext.String.trim(rec.data.A3649ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarRazon)},
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
                    // grid.getStore().removeAt(rowIndex);
                }
            }
        });

    },
    OnUpdateUsosCPN: function () {
        var me = this;
        rec = me.view.params.rec;

        global.Msg({
            msg: 'Update Usos?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDetailTicket + '-form'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: me.urlWin02 + '/ProcesaUpdateUsosCPN/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {
                            IN_PREME: rec.get('A3648PREME'),
                            IN_ANIO: rec.get('A3648ANIO'),
                            IN_CIA: Ext.String.trim(rec.get('A3648CIA')),
                            IN_FORMA: Ext.String.trim(rec.get('A3648FORMA')),
                            IN_SERIE: Ext.String.trim(rec.get('A3648SERIE')),
                            IN_SEQ: Ext.String.trim(rec.get('A3648SEQ')),
                            IN_CORRL: Ext.String.trim(rec.get('A3648CORRL'))
                        },
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //usos cupon
                            Ext.getCmp(prototype.idDetailTicket + '-gridDataStatus').getStore().removeAll();
                            Ext.getCmp(prototype.idDetailTicket + '-gridDataStatus').getStore().loadData(res.lsta_USOS);
                        }
                    });

                }
            }
        });

    },
    CleanFields: function () {
        /* Ext.getCmp(prototype.idDetailTicket + '-gridRazon').getStore().removeAll();
         Ext.getCmp(prototype.idDetailTicket + '-gridTKT').getStore().removeAll();
         Ext.getCmp(prototype.idDetailTicket + '-gridDispuRazon').getStore().removeAll();
         Ext.getCmp(prototype.idDetailTicket + '-nmemo').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-ComboStatus').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-disputable').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-Argument').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-File').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-File2').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-File3').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-trnc').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-disputable').setValue('0.00');
         Ext.getCmp(prototype.idDetailTicket + '-dias').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-mda').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-pbda').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-PBDate').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-ResoDate').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-txtStatus').setValue('');
         Ext.getCmp(prototype.idDetailTicket + '-pbdadif').setValue('0.00');*/


    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idDetailTicket + '-Disputa').setValue(data.A2553DESCR);
    },
    metadata_razon: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idDetailTicket + '-Disputa').setValue(data.A3537NCONX);
    },

    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        if (me.view.params.action === 'FORMPENDIRFND') {
            me.onSumaTaxGrid();
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onChkChangeCPN: function (checkbox, newValue, oldValue, eOpts) {
        var me = this;
        var grid03 = Ext.getCmp(prototype.idDetailTicket + '-gridCPN');
        var regs = grid03.getStore().getCount();
        //
        Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').hide();
        Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').hide();
        Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').hide();
        Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').hide();
        var txtConto = Ext.getCmp(prototype.idDetailTicket + '-CmbConto').getValue();
        if (txtConto === 'C') {
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').show();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').show();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').show();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').show();
        } else {
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').hide();
        }
        if (!newValue) {
            //Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').hide();Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').show();
            me.totalcpn = 0;
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').hide();
            Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').hide();
            //
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '1') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '2') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '3') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '4') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').show();
                }

            }
            //para verificar cupones
            for (var e = 0; e < regs; e++) {
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '1') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '2') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '3') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '4') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }

            }
        } else {
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '1') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '2') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '3') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '4') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').show();
                }

            }
        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var me = this;
        var vl_razon = '';
        var Stat1 = '';
        var Stat2 = '';
        var Stat3 = '';
        var Stat4 = '';
        var vl_razon2 = 0;
        var totaldif = 0;
        var vl_netofop = 0;
        var vl_STATUS = Ext.getCmp(prototype.idDetailTicket + '-ComboStatus').getValue();
        var grid03 = Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt');
        var regs = grid03.getStore().getCount();
        var cbox1 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').getValue();
        var cbox2 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').getValue();
        var cbox3 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').getValue();
        var cbox4 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').getValue();
        var cbox5 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').getValue();
        var cbox6 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').getValue();
        var cbox7 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').getValue();
        var cbox8 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').getValue();
        var vl_type = Ext.getCmp(prototype.idDetailTicket + '-txttidoc').getValue();
        var txtConto = Ext.getCmp(prototype.idDetailTicket + '-CmbConto').getValue();
        var CmbTRFND = Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND').getValue();
        var vl_Showcoupons = Ext.getCmp(prototype.idDetailTicket + '-txtShowcoupons').getValue();
        var grid04 = Ext.getCmp(prototype.idDetailTicket + '-gridTaxes');
        var reg4 = grid04.getStore().getCount();
        var gridPAYMENT = Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT');
        var reg5 = gridPAYMENT.getStore().getCount();
        //diferencia tarifa
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue() === null) {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue('0');
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue('0');
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotal').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotal').setValue('0');
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalXml').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalXml').setValue('0');
        }

        var txtTotal = Ext.getCmp(prototype.idDetailTicket + '-txtTotal').getValue().replace(new RegExp(',', 'g'), '');
        var txtTotalXml = Ext.getCmp(prototype.idDetailTicket + '-txtTotalXml').getValue().replace(new RegExp(',', 'g'), '');
        var txtTotalram = Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').getValue().replace(new RegExp(',', 'g'), '');

        // diferencia de total a rfnd
        if (parseFloat(txtTotal) !== 0) {
            totaldif = (txtTotalram - txtTotal);
            if (totaldif !== 0) {
                if (parseFloat(txtTotalXml) !== 0 && parseFloat(txtTotalram) !== 0) {
                    totaldif = (txtTotalram - txtTotalXml);
                }
            }
        } else {
            totaldif = (txtTotalram - txtTotalXml);
        }

        /*if (parseFloat(txtTotal) !== 0 && parseFloat(txtTotalram) !== 0) {
         totaldif = (txtTotalram - txtTotal);
         }
         if (totaldif !== 0) {
         if (parseFloat(txtTotalXml) !== 0 && parseFloat(txtTotalram) !== 0) {
         totaldif = (txtTotalram - txtTotalXml);
         }
         }*/


        if (vl_STATUS === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select the status');
            bvalida = false;
            return;
        }
        if (vl_STATUS === 'F') {
            if (totaldif > 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The amount of the RFND must not be greater than the Ticket');
                bvalida = false;
                return;
            }
            if (CmbTRFND > 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of RFND');
                bvalida = false;
                return;
            }
            if (txtTotalram === '0') {
                Ext.Msg.alert('.: PRAXIS :.', 'You must enter the amount to RFND');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto).length === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter if the ticket is a C set or is a Start I');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto) !== 'C' && Ext.String.trim(txtConto) !== 'I') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter if the ticket is a C set or is a Start I');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto) === 'C') {
                if (!cbox5 && !cbox6 && !cbox7 && !cbox8) {
                    Ext.Msg.alert('.: PRAXIS :.', 'When the ticket is Start you cannot select coupons from 5 to 8');
                    bvalida = false;
                    return;
                }
            }
            if (txtConto === 'I') {
                if (cbox1 || cbox2 || cbox3 || cbox4) {
                    var vl_cant = 0;
                    var vl_cantcpn = 0;
                    var vl_total = 0;
                    var grid08 = Ext.getCmp(prototype.idDetailTicket + '-gridCPN');
                    var regscpn = grid08.getStore().getCount();
                    for (var x = 0; x < regscpn; x++) {
                        if (CmbTRFND === 'T') {
                            if (!cbox1 && Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '1') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox2 && Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '2') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox3 && Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '3') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox4 && Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '4') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                        } else {

                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '1') {
                                vl_cant = (vl_cant + 1);
                                if (cbox1) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }
                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '2') {
                                vl_cant = (vl_cant + 1);
                                if (cbox2) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }

                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '3') {
                                vl_cant = (vl_cant + 1);
                                if (cbox3) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }
                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A3654CPN')) === '4') {
                                vl_cant = (vl_cant + 1);
                                if (cbox4) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }


                        }

                    }
                    if (CmbTRFND !== 'T') {
                        vl_total = (vl_cant - vl_cantcpn);
                        if (vl_total === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of total refund');
                            bvalida = false;
                            return;
                        }                        
                    }


                }

            }
            //
            if (!vl_Showcoupons) {
                if (!cbox1 && !cbox2 && !cbox3 && !cbox4 && !cbox5 && !cbox6 && !cbox7 && !cbox8) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one coupon');
                    bvalida = false;
                    return;
                }
                var grid05 = Ext.getCmp(prototype.idDetailTicket + '-gridCPN');
                var regscpn = grid05.getStore().getCount();
                for (var i = 0; i < regscpn; i++) {
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A3654CPN')) === '1') {
                        Stat1 = Ext.String.trim(grid05.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A3654CPN')) === '2') {
                        Stat2 = Ext.String.trim(grid05.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A3654CPN')) === '3') {
                        Stat3 = Ext.String.trim(grid05.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A3654CPN')) === '4') {
                        Stat4 = Ext.String.trim(grid05.getStore().getAt(i).get('A3654CURS1'));
                    }

                }
                if (cbox1 && Stat1 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox1 && Stat1 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox1 && Stat1 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already EXCH');
                    bvalida = false;
                    return;
                }
                ///////
                if (cbox2 && Stat2 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox2 && Stat2 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox2 && Stat2 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already EXCH');
                    bvalida = false;
                    return;
                }
                /////
                if (cbox3 && Stat3 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox3 && Stat3 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox3 && Stat3 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already EXCH');
                    bvalida = false;
                    return;
                }
                ///

                if (cbox4 && Stat4 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox4 && Stat4 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox4 && Stat4 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already EXCH');
                    bvalida = false;
                    return;
                }
            } else {
                if (vl_STATUS === 'F') {
                    if (!cbox1 && !cbox2 && !cbox3 && !cbox4 && !cbox5 && !cbox6 && !cbox7 && !cbox8) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one coupon');
                        bvalida = false;
                        return;
                    }
                }
            }
            //Validar las FOP
            if (reg5 === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter payment method');
                bvalida = false;
                return;
            } else {
                for (var p = 0; p < reg5; p++) {

                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'CA') {
                        if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653FEXP')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, younot  must enter the expiration date');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CAPL')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter Approval Card');
                            bvalida = false;
                            return;
                        }
                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }

                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'CC' || Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'ET') {

                        if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')) === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'CA' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'VI' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'JC' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'DS' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'IK' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'BA') {
                            if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length !== 16) {
                                Ext.Msg.alert('.: PRAXIS :.', 'The Fop CA,VI,JC,DS,IK,BA must have 16 characters');
                                bvalida = false;
                                return;
                            }
                        } else {
                            if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'PP' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'AX' || gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'TP') {
                                if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length !== 15) {
                                    Ext.Msg.alert('.: PRAXIS :.', 'The Fop PP,AX,TP must have 15 characters');
                                    bvalida = false;
                                    return;
                                }
                            } else {
                                if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === 'DC') {
                                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length !== 14) {
                                        Ext.Msg.alert('.: PRAXIS :.', 'The Fop DC must have 14 characters');
                                        bvalida = false;
                                        return;
                                    }
                                } else {
                                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length > 16 || Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length > 14) {
                                        Ext.Msg.alert('.: PRAXIS :.', 'The Fop must have 14 or 16 characters');
                                        bvalida = false;
                                        return;
                                    }
                                }

                            }
                        }

                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }

                    }
                    vl_netofop = (vl_netofop + parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')));



                }
            }
            vl_netofop = (txtTotalram - vl_netofop);
            if (vl_netofop !== 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'the total fop must be equal to the total refund');
                bvalida = false;
                return;
            }
            //validar taxes
            if (!Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').getValue() && !Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').getValue()) {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Apply change status / BPO  O Apply robot sabre');
                bvalida = false;
                return;
            }

            for (var o = 0; o < reg4; o++) {
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652CDTAX')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Code Tax');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652MONED')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Currency');
                    bvalida = false;
                    return;
                }
                if (grid04.getStore().getAt(o).get('A3652TXDIF') === 0 || grid04.getStore().getAt(o).get('A3652TXDIF') === 0.00) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Tax  Amount');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652CDTAX')) === 'XF' && Ext.String.trim(grid04.getStore().getAt(o).get('A3652APFC')).length < 3) {
                    Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport for tax XF');
                    bvalida = false;
                    return;
                }


            }
        }
        // validacion general
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
            bvalida = false;
        }
        if (regs !== 0) {
            for (var o = 0; o < regs; o++) {
                vl_razon2 = vl_razon2 + 1;
            }
            if (vl_razon2.length === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The free text must be used with another answer');
                bvalida = false;
            }
        }
        if (regs !== 0) {
            for (var t = 0; t < regs; t++) {
                vl_razon = vl_razon + grid03.getStore().getAt(t).get('A3649ERROR');
                if (grid03.getStore().getAt(t).get('A3649ERROR').length > 250) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters');
                    bvalida = false;
                    return;
                }
            }
            if (vl_razon.length > 1000) {
                Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 1000 characters');
                bvalida = false;
            }
        }
        for (var w = 0; w < regs; w++) {
            if (grid03.getStore().getAt(w).get('A3649FAMIL') === 'Authorise' && vl_STATUS === 'R') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the rejected status cannot be used with authorise answer');
                bvalida = false;
                return;
            }
            if (grid03.getStore().getAt(w).get('A3649FAMIL') !== 'Authorise' && vl_STATUS === 'F') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the Authorise status cannot be used with rejected answer');
                bvalida = false;
                return;
            }
        }

        return bvalida;
    },
    onClickSave: function (btn) {
        var me = this;
        var vl_mensaje = 'Insert Data?';
        var checkApply = '';
        if (me.validaRequiredFields()) {
            if (me.lsta_Documents > 0) {
                vl_mensaje = 'The ticket has more than one document, do you want to continue?';
            }
            rec = me.view.params.rec;
            global.Msg({
                msg: vl_mensaje,
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        if (Ext.getCmp(prototype.idDetailTicket + '-checkApplyBPO').getValue()) {
                            checkApply = 'Y';
                        }
                        if (Ext.getCmp(prototype.idDetailTicket + '-checkApplyrobot').getValue()) {
                            checkApply = 'N';
                        }
                        me.beanTMP.IN_FOLIO = '';
                        me.beanTMP.IN_COUNTRY = '';

                        me.beanTMP.IN_CORRL = Ext.String.trim(rec.get('A3648CORRL'));
                        me.beanTMP.IN_PREME = Ext.String.trim(rec.get('A3648PREME'));
                        me.beanTMP.IN_ANIO = Ext.String.trim(rec.get('A3648ANIO'));
                        me.beanTMP.IN_CIA = Ext.String.trim(rec.get('A3648CIA'));
                        me.beanTMP.IN_FORMA = Ext.String.trim(rec.get('A3648FORMA'));
                        me.beanTMP.IN_SERIE = Ext.String.trim(rec.get('A3648SERIE'));
                        me.beanTMP.IN_SEQ = Ext.String.trim(rec.get('A3648SEQ'));
                        //
                        me.beanTMP.IN_TARIF = Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue();
                        me.beanTMP.IN_MDA = Ext.getCmp(prototype.idDetailTicket + '-txtmda').getValue();
                        me.beanTMP.IN_TARIFEQUI = Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue();
                        me.beanTMP.IN_MDAEQUI = Ext.getCmp(prototype.idDetailTicket + '-txtEqmda').getValue();
                        me.beanTMP.IN_TTAX = Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_COMMI = Ext.getCmp(prototype.idDetailTicket + '-txtCommissionAm').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_TOTALRFND = Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.idDetailTicket + '-ComboStatus').getValue();
                        me.beanTMP.IN_CONJU = Ext.getCmp(prototype.idDetailTicket + '-CmbConto').getValue();
                        me.beanTMP.IN_TRFND = Ext.getCmp(prototype.idDetailTicket + '-CmbTRFND').getValue();
                        me.beanTMP.IN_MARCA = checkApply;
                        //me.beanTMP.IN_MARCA = Ext.getCmp(prototype.idDetailTicket + '-Combochangestatus').getValue();
                        var cbox1 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn1').getValue();
                        var cbox2 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn2').getValue();
                        var cbox3 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn3').getValue();
                        var cbox4 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn4').getValue();
                        var cbox5 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn5').getValue();
                        var cbox6 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn6').getValue();
                        var cbox7 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn7').getValue();
                        var cbox8 = Ext.getCmp(prototype.idDetailTicket + '-txtCpn8').getValue();
                        if (cbox1) {
                            me.beanTMP.IN_CPN1 = '1';
                        } else {
                            me.beanTMP.IN_CPN1 = '';
                        }
                        if (cbox2) {
                            me.beanTMP.IN_CPN2 = '2';
                        } else {
                            me.beanTMP.IN_CPN2 = '';
                        }
                        if (cbox3) {
                            me.beanTMP.IN_CPN3 = '3';
                        } else {
                            me.beanTMP.IN_CPN3 = '';
                        }
                        if (cbox4) {
                            me.beanTMP.IN_CPN4 = '4';
                        } else {
                            me.beanTMP.IN_CPN4 = '';
                        }

                        if (cbox5) {
                            me.beanTMP.IN_CPN5 = '5';
                        } else {
                            me.beanTMP.IN_CPN5 = '';
                        }
                        if (cbox6) {
                            me.beanTMP.IN_CPN6 = '6';
                        } else {
                            me.beanTMP.IN_CPN6 = '';
                        }
                        if (cbox7) {
                            me.beanTMP.IN_CPN7 = '7';
                        } else {
                            me.beanTMP.IN_CPN7 = '';
                        }
                        if (cbox8) {
                            me.beanTMP.IN_CPN8 = '8';
                        } else {
                            me.beanTMP.IN_CPN8 = '';
                        }


                        var lstRazones = new Array();
                        var lstTaxes = new Array();
                        var lstFop = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idDetailTicket + '-gridRazonesTkt').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        for (var i = 0; i < Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idDetailTicket + '-gridTaxes').getStore().data.items[i].data;
                            lstTaxes.push(bean);
                        }

                        for (var i = 0; i < Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idDetailTicket + '-gridPAYMENT').getStore().data.items[i].data;
                            lstFop.push(bean);
                        }
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDetailTicket + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaManualRFNDTCKT/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP),
                                beanlstRazones: JSON.stringify(lstRazones),
                                beanlstTaxes: JSON.stringify(lstTaxes),
                                beanlstlstFop: JSON.stringify(lstFop)
                            },
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'Proceso Culminado') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idDetailTicket + '-win').close();
                                            Ext.getCmp(prototype.idRFNDPending + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idRFNDPending + '-Contenedor').getController().searchform_detalle2();
                                        }


                                    }});
                            }
                        });
                    }

                }
            });
        }


    },
    OnColumnHistoRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idDetailTicket + \'-win\').getController().onWinFileHistoViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileHistoViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idDetailTicket + '-gridRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A2553TYPO === 'AM') {
            nmemo = Ext.getCmp(prototype.idDetailTicket + '-txtconxp').getValue();
        } else {
            nmemo = Ext.getCmp(prototype.idDetailTicket + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory2(rec.data, nmemo, Ext.getCmp(prototype.idDetailTicket + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idDetailTicket + \'-win\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idDetailTicket + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A3537TYPE === 'AM') {
            if (Ext.getCmp(prototype.idDetailTicket + '-txtconxp').getValue() !== '') {
                nmemo = Ext.getCmp(prototype.idDetailTicket + '-txtconxp').getValue();
            } else {
                nmemo = Ext.getCmp(prototype.idDetailTicket + '-txtpreme').getValue();
            }
        } else {
            nmemo = Ext.getCmp(prototype.idDetailTicket + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, nmemo, Ext.getCmp(prototype.idDetailTicket + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    onWinFormRazonesClick: function () {
        var me = this;
        rec = me.view.params.rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDPending.RFNDFormRazones({
            params: {
                params: rec.data
            }
        });
        win.show();
    },
    onTotaFare: function (o, e, eOpts) {
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
                Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setValue(0);
            }
            if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue() === null) {
                Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(0);
            }
            if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue('0');
            }
            var tarifaAm = 0;//.replace(',', '');
            if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
                tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue();
            } else {
                tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue();
            }
            var TotalTaxAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
            var total = (tarifaAm + parseFloat(TotalTaxAm));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
            //Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
        }


    },
    onSearchkey: function (f, e) {
        //alert(e.getKey());
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {

                if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
                    Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').setValue(0);
                }
                if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue() === null) {
                    Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(0);
                }
                if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue('0');
                }
                if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                    Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue('0');
                }
                var tarifaAm = 0;
                if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
                    tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue();
                } else {
                    tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue();
                }
                var TotalTaxAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
                var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm));
                Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
                //Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
                Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
            }
        }


    },

    onSumaTaxGrid: function () {
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            var grid01 = Ext.getCmp(prototype.idDetailTicket + '-gridTaxes');
            var regs = grid01.getStore().getCount();
            var Total = 0;
            var monto = 0;
            for (var i = 0; i < regs; i++) {
                monto = grid01.getStore().getAt(i).get('A3652TXDIF');
                Total += parseFloat(monto);
            }
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(Total, '0,000.00'));
            me.onTotalRFND();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTotalRFND: function () {
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue('0');
        }
        var tarifaAm = 0;
        if (Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
            tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalEqFareAm').getValue();
        } else {
            tarifaAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').getValue();
        }

        var TotalTaxAm = Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
        var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm));

        Ext.getCmp(prototype.idDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
        //Ext.getCmp(prototype.idDetailTicket + '-txtTotalFareAm').setValue(tarifaAm);
        //Ext.getCmp(prototype.idDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
    },
    OnListHistoryRenderer: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicketHistory({
            params: {
                rec: me.beanHistorical
            }
        });
        win.show();
    },
    onSeguimietoClick: function (grid, rowIndex, colIndex) {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.RFNDFormErrorBPO({
            params: {
                rec: rec
            }
        });
        win.show();
    }




});


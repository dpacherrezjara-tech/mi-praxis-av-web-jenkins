Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.SalesAuditAcceptedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAuditAcceptedController',
    childs: '',
    stack: [],
    bean: {},
    beanerror: {},
    lstSelectedTkts: {},
    lstCampos: {},
    lstCampos2: '',
    cbxCamposAC: new Array(),
    headerChecked: false,
    gridDataAC: new Array(),
    init: function (view) {
        var me = this;
    },
    afterRender: function () {
        this.setCountry();
        this.setStoresGrids();
        this.setStoresFilters();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    OnBeforeShow: function () {
        prototype.id = 'SalesAuditAcceptedForm';
        prototype.id0 = 'CtrlDeliveryAudiForm';
        prototype.id1 = 'DataEntryDetail';
        prototype.id2 = 'DataEntryDetailsTaxes';
        prototype.id3 = 'DataEntryDetailsCommis';
        prototype.id4 = 'DataEntryDetailsTaxOnComi';
        prototype.id5 = 'DataEntryDetailsReason';
        prototype.id6 = 'DataEntryDetailsFOP';
        prototype.id7 = 'DataEntryDetailsHistorialTKT';
        prototype.id8 = 'DataEntryDetailsPDI';
        prototype.id9 = 'DataEntrySalesAuditAccepted';
        prototype.url = CONTEXTPATH + '/SalesAuditAccepted';
        prototype.widthContenedor = 1395;
        prototype.heightContenedor = 605;

    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-gridData');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-gridData',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    setCountry: function () {
        var me = this;
        var cmbUser = Ext.getCmp(prototype.id + '-txtCountry');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01'
        });
        cmbUser.setStore(store01);
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-txtCountry').getStore().loadData(res.lstOperadores);
                Ext.getCmp(prototype.id + '-txtCodReason').getStore().loadData(res.lstCampos2);
                me.lstCampos = res.lstCampos;
                var res = Ext.JSON.decode(response.responseText);
                if (Ext.String.trim(res.user.USR) === 'XJGIL' || Ext.String.trim(res.user.USR) === 'XMONSERRAT' || Ext.String.trim(res.user.USR) === 'XIALVARADO' || Ext.String.trim(res.user.USR) === 'GUESTPRX') {
                    Ext.getCmp(prototype.id + 'matchup').show();
                    Ext.getCmp(prototype.id + 'btn-Matchup').show();
                    Ext.getCmp(prototype.id + 'btn-1').hide();
                    Ext.getCmp(prototype.id + 'btn-2').show();
                    
                } else {
                    Ext.getCmp(prototype.id + 'matchup').hide();
                    Ext.getCmp(prototype.id + 'btn-Matchup').hide();
                    Ext.getCmp(prototype.id + 'btn-1').show();
                    Ext.getCmp(prototype.id + 'btn-2').hide();
                }
                if (Ext.String.trim(res.user.USR) === 'AILEENA' || Ext.String.trim(res.user.USR) === 'ROSSANAR' || Ext.String.trim(res.user.USR) === 'DANAZCO' || Ext.String.trim(res.user.USR) === 'GUESTPRX') {
                    Ext.getCmp(prototype.id + 'btn-SendNotifi').show();
                    Ext.getCmp(prototype.id + 'Notifi').show();
                    Ext.getCmp(prototype.id + 'btn-1').hide();
                    Ext.getCmp(prototype.id + 'btn-2').show();
                    Ext.getCmp(prototype.id + 'matchup').hide();
                } else {
                    Ext.getCmp(prototype.id + 'btn-SendNotifi').hide();
                    Ext.getCmp(prototype.id + 'btn-1').show();
                    Ext.getCmp(prototype.id + 'btn-2').hide();
                     Ext.getCmp(prototype.id + 'Notifi').hide();
                }

            }
        });
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        if (obj !== true) {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        }

        var cmbSearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var ComboChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        //var tatusAgency = Ext.getCmp(prototype.id + '-tatusAgency');
        var txtAmount = Ext.getCmp(prototype.id + '-txtAmount').getValue();
        var txtAgent = Ext.getCmp(prototype.id + '-txtAgent').getValue();
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND').getValue();
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO').getValue();
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM').getValue();

        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu').getValue();
        var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis').getValue();
        var txtFBasis = Ext.getCmp(prototype.id + '-txtFBasis').getValue();
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason').getValue();
        var txtCodReason = Ext.getCmp(prototype.id + '-txtCodReason').getValue();
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume').getValue();
        var txtFilterBookDateFrom = Ext.getCmp(prototype.id + '-txtFilterBookDateFrom').getRawValue();
        var txtIT = Ext.getCmp(prototype.id + '-txtIT').getValue();

        if (cmbSearch === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (cmbSearch === "1" || cmbSearch === "4") {
            if (txtCia === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date CIA", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtCia').focus();", 100);
                });
                return;
            }
            if (txtFrmaSerie === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date Ticket", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }


        }
        if (cmbSearch === "2" || cmbSearch === "3") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
            if (txtFilterBookDateFrom !== '') {
                if (global.existeFecha(txtFilterBookDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterBookDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterBookDateFrom').focus();", 100);
                    });
                    return;
                }

            }

        }
        if (txtCountry === 'ALL') {
            me.bean.A1672PAIVT = '';
        } else {
            me.bean.A1672PAIVT = txtCountry;
        }
        if (txtCodReason === 'ALL') {
            me.bean.REASONS = '';
        } else {
            me.bean.REASONS = txtCodReason;
        }
        if (txtFrmaSerie !== '') {
            me.bean.strTicket = txtCia + "" + txtFrmaSerie + "" + txtSeq;
        } else {
            me.bean.strTicket = "";
        }
        if (txtAmount !== '') {
            me.bean.MONTO = txtAmount;
        } else {
            me.bean.MONTO = '0';
        }
        me.bean.OPCION = cmbSearch;
        me.bean.DATEFROM = txtFilterDateFrom;
        me.bean.DATETO = txtFilterDateTo;
        me.bean.A1672FUENT = ComboSource;
        me.bean.A1672CANAL = ComboChannel;
        me.bean.A1672TDOC = ComboTypeDocume;
        me.bean.A1672TRNCU = ComboTrncu;
        me.bean.A1672AGENT = txtIATA;
        me.bean.A1672ITIN = txtIT;
        me.bean.A1672FBASI = txtFBasis;
        me.bean.BOOKFROM = txtFilterBookDateFrom;
        me.bean.BOOKTO = ComboStatusADM;
        me.bean.LIKEFBASIS = ComboLikeFBasis;
        me.bean.LIKEREASON = ComboLikeReason;
        //this.bean.ROUTE = ;        
        me.bean.Agent = txtAgent;
        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        me.SearchReportAccepted(me.bean, obj === true ? obj : false);
    },
    SearchReportAccepted: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            // console.log(bean);return;
            me.exportExcel(prototype.url + '/getXLSX?A1672PAIVT=' + bean.A1672PAIVT + '&REASONS=' + bean.REASONS + '&strTicket=' + bean.strTicket + '&MONTO=' + bean.MONTO + '&OPCION=' + bean.OPCION + '&DATEFROM=' + bean.DATEFROM + '&DATETO=' + bean.DATETO + '&A1672FUENT=' + bean.A1672FUENT + '&A1672CANAL=' + bean.A1672CANAL + '&A1672TDOC=' + bean.A1672TDOC + '&A1672TRNCU=' + bean.A1672TRNCU + '&A1672AGENT=' + bean.A1672AGENT + '&A1672ITIN=' + bean.A1672ITIN + '&A1672FBASI=' + bean.A1672FBASI + '&BOOKFROM=' + bean.BOOKFROM + '&BOOKTO=' + bean.BOOKTO + '&LIKEFBASIS=' + bean.LIKEFBASIS + '&LIKEREASON=' + bean.LIKEREASON + '&Agent=' + bean.Agent);
        } else {
            // var campo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
            //campo_cantidad.hide();
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.id + '-pagination').enable();
                    } else {
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });

        }
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.bean;
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //   Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');
        //var tatusAgency = Ext.getCmp(prototype.id + '-tatusAgency');
        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu');
        var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis');
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason');
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume');
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM');
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND');
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO');
        var ComboAction = Ext.getCmp(prototype.id + '-ComboAction');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "4", "name": "PATTERN"},
                {"code": "2", "name": "PROCESSING DATE"},
                {"code": "3", "name": "SYSTEM DATE"},
                {"code": "1", "name": "TICKET"}

            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

        CmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "GSA", "name": "GSA"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));

        /*tatusAgency.bindStore(Ext.create('Ext.data.Store', {
         data: [
         {"code": "", "name": "ALL"},
         {"code": "0", "name": "Active"},
         {"code": "1", "name": "Closed"}
         ]
         }));*/

        ComboTrncu.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SALE", "name": "SALE"},
                {"code": "EXCH", "name": "EXCH"},
                {"code": "RFND", "name": "RFND"}
            ]
        }));
        ComboLikeFBasis.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "Equal"},
                {"code": "2", "name": "Not Equal"},
                {"code": "3", "name": "Like"},
                {"code": "4", "name": "Not Like"}
            ]
        }));

        ComboLikeReason.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "Equal"},
                {"code": "2", "name": "Not Equal"}
            ]
        }));

        ComboTypeDocume.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "TKT", "name": "TKT"},
                {"code": "EMD", "name": "EMD"},
                {"code": "VOU", "name": "VOU"}
            ]
        }));
        ComboStatusADM.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "Suggested"},
                {"code": "T", "name": "Reaudited BPO"},
                {"code": "C", "name": "Unregistered Client"},
                {"code": "S", "name": "Minimum"},
                {"code": "B", "name": "SPECIAL CASES"}
            ]
        }));
        ComboRFND.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "T", "name": "TOTAL"},
                {"code": "P", "name": "PARTIAL"}
            ]
        }));
        ComboTRNCO.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SALE", "name": "SALE"},
                {"code": "EXCH", "name": "EXCH"}
            ]
        }));
        ComboTRNCO.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SALE", "name": "SALE"},
                {"code": "EXCH", "name": "EXCH"}
            ]
        }));
        ComboAction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "Z", "name": "GENERAL"},
                {"code": "M", "name": "MASSIVE PATTERN"}
            ]
        }));

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchAfterRender2: function (obj) {
        obj.setValue('0');
    },
    onCmbSearchAfterRender3: function (obj) {
        obj.setValue('1');
    },
    onCmbSearchAfterRender4: function (obj) {
        obj.setValue('ALL');
    },
    onCmbSearchAfterRender5: function (obj) {
        obj.setValue('Z');
    },
    onCmbTrncuChange: function (obj, records, eOpts) {
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND');
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO');
        if (obj.getValue() === "RFND") {

            ComboRFND.show();
            ComboTRNCO.show();

            ComboRFND.setValue('');
            ComboTRNCO.setValue('');

        } else {
            ComboRFND.hide();
            ComboTRNCO.hide();

            ComboRFND.setValue('');
            ComboTRNCO.setValue('');

        }
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        //var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry');
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource');
        var ComboChannel = Ext.getCmp(prototype.id + '-ComboChannel');
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        //var tatusAgency = Ext.getCmp(prototype.id + '-tatusAgency');
        var txtAmount = Ext.getCmp(prototype.id + '-txtAmount');
        var txtAgent = Ext.getCmp(prototype.id + '-txtAgent');
        var filter02 = Ext.getCmp(prototype.id + '-box-filter-02');
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND');
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO');
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM');

        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu');
        var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis');
        var txtFBasis = Ext.getCmp(prototype.id + '-txtFBasis');
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason');
        var txtCodReason = Ext.getCmp(prototype.id + '-txtCodReason');
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume');
        var txtFilterBookDateFrom = Ext.getCmp(prototype.id + '-txtFilterBookDateFrom');
        var txtIT = Ext.getCmp(prototype.id + '-txtIT');





        switch (String(obj.getValue())) {
            case '1':
                txtCia.show();
                txtFrmaSerie.show();
                txtSeq.show();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                txtCountry.hide();
                ComboSource.hide();
                ComboChannel.hide();
                txtIATA.hide();
                //tatusAgency.hide();
                txtAmount.hide();
                txtAgent.hide();
                filter02.hide();
                ComboRFND.hide();
                ComboTRNCO.hide();
                ComboStatusADM.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                //tatusAgency.setValue('');
                txtAmount.setValue('');
                txtAgent.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                ComboStatusADM.setValue('');
                ComboTrncu.setValue('');
                ComboLikeFBasis.setValue('1');

                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
                txtFilterBookDateFrom.setValue('');
                txtIT.setValue('');
                break;
            case '2':
            case '3':
                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();
                ComboChannel.hide();

                txtFilterDateFrom.show();
                txtFilterDateTo.show();
                txtCountry.show();
                ComboSource.show();
                ComboStatusADM.show();

                txtIATA.show();
                //tatusAgency.show();
                txtAmount.show();
                txtAgent.show();
                filter02.show();
                ComboRFND.hide();
                ComboTRNCO.hide();

                txtFrmaSerie.setValue('');
                txtSeq.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                break;
            case '4':
                txtCia.show();
                txtFrmaSerie.show();
                txtSeq.show();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                txtCountry.hide();
                ComboSource.hide();
                ComboChannel.hide();
                txtIATA.hide();
                //tatusAgency.hide();
                txtAmount.hide();
                txtAgent.hide();
                filter02.hide();
                ComboRFND.hide();
                ComboTRNCO.hide();
                ComboStatusADM.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                //tatusAgency.setValue('');
                txtAmount.setValue('');
                txtAgent.setValue('');
                ComboStatusADM.setValue('');
                ComboTrncu.setValue('');
                ComboLikeFBasis.setValue('1');
                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
                txtFilterBookDateFrom.setValue('');
                txtIT.setValue('');
                break;
            case '':
                txtCia.hide();
                txtFrmaSerie.hide();
                txtSeq.hide();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                txtCountry.hide();
                ComboSource.hide();
                ComboChannel.hide();
                txtIATA.hide();
                ComboRFND.hide();
                ComboTRNCO.hide();
                //tatusAgency.hide();
                txtAmount.hide();
                txtAgent.hide();
                filter02.hide();
                ComboStatusADM.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                //tatusAgency.setValue('');
                txtAmount.setValue('');
                txtAgent.setValue('');
                txtFrmaSerie.setValue('');
                txtSeq.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                ComboStatusADM.setValue('');
                ComboTrncu.setValue('');
                ComboLikeFBasis.setValue('1');
                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
                txtFilterBookDateFrom.setValue('');
                txtIT.setValue('');
                break;
        }
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(false);
                break;
        }

    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    searchPopup: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry(rec);
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (record.get('A1672CORREO')) {
            case 2:
                color = '#F5A9F2';
                value = 'unregistered mail';
                break;
            case 1:
                color = '#D8D8D8';
                value = 'registered mail';
                break;
            case 0:
                color = '#FFFFFF';
                value = '';
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    winDataEntry: function (rec) {
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetail({
            params: {
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },
    btnOK_clickHandler: function (obj) {
        var me = this;
        var vl_fuent = '';
        var vl_correo = 0;
        var lstNewList = new Array();
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    vl_fuent = Ext.String.trim(row.get('A1672FUENT'));
                    if (row.get('A1672CORREO') === 1) {
                        vl_correo = 2;
                    }
                    lstNewList.push(row.data);
                } else {
                    if (vl_fuent !== Ext.String.trim(row.get('A1672FUENT')))
                    {
                        Ext.Msg.alert('.: PRAXIS :.', 'You cant not select more than one Source');
                        return;
                    } else {
                        lstNewList.push(row.data);
                        if (row.get('A1672CORREO') === 1) {
                            vl_correo = 2;
                        }
                    }
                }

            }
            if (lstNewList.length > 0) {
                var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntrySalesAuditAccepted({
                    params: {
                        cmbOpcion: obj.getValue(),
                        lstSelectedTkts: lstNewList,
                        lstComment: me.lstCampos,
                        fuente: vl_fuent,
                        correo: vl_correo,
                        tktPattern: Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue() + '' + Ext.getCmp(prototype.id + '-txtSeq').getValue(),
                        url01: prototype.url
                    }
                });
                win.show();
            }
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'Debes selecionar una Ticket');
            return;
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(true);
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onCmbActionSelect: function (obj) {
        if (obj.getValue() === 'M') {

        } else {

        }

    },
    btnGroup_clickHandler: function (obj) {
        global.Msg({
            msg: 'Match up?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/Group/',
                        timeout: 60000000,
                        method: 'POST',
                        //params: {beanString: JSON.stringify(this.beanupdate.A2548PAIS)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = 0;
                            if (res.data === 'RECORD INSERTED' || res.data === 'Proceso Culminado') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {


                                }});
                        }
                    });
                }

            }
        });
    },
    btnSendNotifi_clickHandler: function (obj) {
        global.Msg({
            msg: 'Send notifications?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/Sendnotifi/',
                        timeout: 60000000,
                        method: 'POST',
                        //params: {beanString: JSON.stringify(this.beanupdate.A2548PAIS)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = 0;
                            if (res.data === 'Notifications were sent successfully') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {


                                }});
                        }
                    });
                }

            }
        });
    }

});

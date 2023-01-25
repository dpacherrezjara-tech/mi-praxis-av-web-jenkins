Ext.define('Ext.Praxis.controller.salesaudit.SalesMasterReportForm.SalesMasterReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesMasterReportFormController',
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
        prototype.id = 'SalesMasterReportForm';
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
        prototype.url2 = CONTEXTPATH + '/SalesMasterReportForm';
        prototype.widthContenedor = 1395;
        prototype.heightContenedor = 605;

    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url2 + '/search',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);
        /*var grid00 = Ext.getCmp(prototype.id + '-gridData');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-gridData',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url2 + '/search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);*/
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
        var ComboTransfer = Ext.getCmp(prototype.id + '-ComboTransfer').getValue();
        //var txtAmount = Ext.getCmp(prototype.id + '-txtAmount').getValue();
        var txtAgent = Ext.getCmp(prototype.id + '-txtAgent').getValue();
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND').getValue();
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO').getValue();
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM').getValue();

        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu').getValue();
        //var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis').getValue();
        var txtFBasis = Ext.getCmp(prototype.id + '-txtFBasis').getValue();
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason').getValue();
        var txtCodReason = Ext.getCmp(prototype.id + '-txtCodReason').getValue();
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume').getValue();
        //var txtFilterBookDateFrom = Ext.getCmp(prototype.id + '-txtFilterBookDateFrom').getRawValue();
        var txtIT = Ext.getCmp(prototype.id + '-txtIT').getValue();
        var cmbOpcionAudit = Ext.getCmp(prototype.id + '-cmbOpcionAudit').getValue();
        var cmbTypeMemo = Ext.getCmp(prototype.id + '-cmbTypeMemo').getValue();

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

        }
        if (txtCountry === 'ALL') {
            me.bean.VP_PAIS = '';
        } else {
            me.bean.VP_PAIS = txtCountry;
        }
        if (txtCodReason === 'ALL') {
            me.bean.VP_CODREASON = '';
        } else {
            me.bean.VP_CODREASON = txtCodReason;
        }
        if (txtFrmaSerie !== '') {
            me.bean.VP_FRMSRIE = txtFrmaSerie;
            me.bean.VP_SEQ = txtSeq;
        } else {
            me.bean.VP_FRMSRIE = "";
            me.bean.VP_SEQ = "";
        }
        me.bean.VP_FILTER = cmbSearch;
        me.bean.VP_CIA = txtCia;
        //
        me.bean.VP_SOURCE = ComboSource;
        me.bean.VP_DATEFROM = txtFilterDateFrom;
        me.bean.VP_DATETO = txtFilterDateTo;
        me.bean.VP_CANAL = ComboChannel;
        me.bean.VP_TRNCU = ComboTrncu;
        me.bean.VP_IATA = txtIATA;
        me.bean.VP_IT = txtIT;
        me.bean.VP_FBASIS = txtFBasis;
        //me.bean.VP_CODREASON = ComboLikeReason;
        me.bean.VP_TYMEMO = cmbTypeMemo;
        me.bean.VP_AUDIT = cmbOpcionAudit;
        me.bean.VP_STATUS = ComboTransfer;
        me.bean.VP_TDOC = ComboTypeDocume;
        //AGREGAR
        me.bean.Agent = txtAgent;
        me.bean.BOOKTO = ComboStatusADM;
        me.bean.VP_STREVISION = Ext.getCmp(prototype.id + '-ComboTransfer').getValue();

        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        me.SearchReport(me.bean, obj === true ? obj : false);
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
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url2 + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
             Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                        console.log(Objtemp);
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(Objtemp.A2548CATNMEMO);
                        
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
            // var campo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
            //campo_cantidad.hide();
            /*var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            store.removeAll();
            store.loadPage(1, {
                params: bean,
                //params:{beanString: JSON.stringify(bean)},
                // params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.id + '-pagination').enable();
                    } else {
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });*/

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
        var cmbTypeMemo = Ext.getCmp(prototype.id + '-cmbTypeMemo');
        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu');
        var ComboTransfer = Ext.getCmp(prototype.id + '-ComboTransfer');
        //var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis');
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason');
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume');
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM');
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND');
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO');
        var cmbOpcionAudit = Ext.getCmp(prototype.id + '-cmbOpcionAudit');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                //{"code": "4", "name": "PATTERN"},
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
        /*ComboLikeFBasis.bindStore(Ext.create('Ext.data.Store', {
         data: [
         {"code": "1", "name": "Equal"},
         {"code": "2", "name": "Not Equal"},
         {"code": "3", "name": "Like"},
         {"code": "4", "name": "Not Like"}
         ]
         }));*/

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
                {"code": "S", "name": "Minimum"}
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
        cmbOpcionAudit.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "1", "name": "YES"},
                {"code": "2", "name": "NO"}
            ]
        }));

        cmbTypeMemo.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "2", "name": "ADM"},
                {"code": "3", "name": "ACM"},
                {"code": "4", "name": "ERROR"},
                {"code": "1", "name": "MATCH"},
                {"code": "0", "name": "PENDING"}

            ]
        }));

        ComboTransfer.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ACCEPTED"},
                {"code": "Z", "name": "AUTHORIZED"},
                {"code": "T", "name": "ADM DIRECT"},
                {"code": "W", "name": "GROUPING PENDING"},
                {"code": "D", "name": "IATA DISABLED"},
                {"code": "J", "name": "JUSTIFIED"},
                {"code": "F", "name": "MATCH FORCED"},
                {"code": "B", "name": "SPECIAL CASES"},
                {"code": "Y", "name": "SUGGESTED"},
                {"code": "N", "name": "REJECTED"},
                {"code": "R", "name": "REAUDITED"},
                {"code": "C", "name": "UNREGISTERED CLIENT"}


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
        var cmbOpcionAudit = Ext.getCmp(prototype.id + '-cmbOpcionAudit');
        var txtAgent = Ext.getCmp(prototype.id + '-txtAgent');
        var filter02 = Ext.getCmp(prototype.id + '-box-filter-02');
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND');
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO');
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM');
        var cmbTypeMemo = Ext.getCmp(prototype.id + '-cmbTypeMemo');
        var btnSend = Ext.getCmp(prototype.id + '-btnSend');

        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu');
        // var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis');
        var txtFBasis = Ext.getCmp(prototype.id + '-txtFBasis');
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason');
        var txtCodReason = Ext.getCmp(prototype.id + '-txtCodReason');
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume');
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
                txtFBasis.hide();
                cmbOpcionAudit.hide();
                txtAgent.hide();
                filter02.hide();
                ComboRFND.hide();
                ComboTRNCO.hide();
                ComboStatusADM.hide();
                cmbTypeMemo.hide();
                btnSend.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                //tatusAgency.setValue('');
                cmbOpcionAudit.setValue('');
                txtAgent.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                ComboStatusADM.setValue('');
                ComboTrncu.setValue('');
                cmbTypeMemo.setValue('');
                //ComboLikeFBasis.setValue('1');

                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
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
                cmbTypeMemo.show();
                btnSend.show();

                txtIATA.show();
                txtFBasis.show();
                cmbOpcionAudit.show();
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
                txtFBasis.hide();
                cmbOpcionAudit.hide();
                txtAgent.hide();
                filter02.hide();
                ComboRFND.hide();
                ComboTRNCO.hide();
                ComboStatusADM.hide();
                cmbTypeMemo.hide();
                btnSend.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                //tatusAgency.setValue('');
                cmbOpcionAudit.setValue('');
                txtAgent.setValue('');
                ComboStatusADM.setValue('');
                ComboTrncu.setValue('');
                cmbTypeMemo.setValue('');
                //ComboLikeFBasis.setValue('1');
                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
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
                txtFBasis.hide();
                cmbOpcionAudit.hide();
                txtAgent.hide();
                filter02.hide();
                ComboStatusADM.hide();
                cmbTypeMemo.hide();
                btnSend.hide();

                txtFilterDateFrom.setValue('');
                txtFilterDateTo.setValue('');
                txtCountry.setValue('ALL');
                ComboSource.setValue('');
                ComboChannel.setValue('');
                txtIATA.setValue('');
                //tatusAgency.setValue('');
                cmbOpcionAudit.setValue('');
                txtAgent.setValue('');
                txtFrmaSerie.setValue('');
                txtSeq.setValue('');
                ComboRFND.setValue('');
                ComboTRNCO.setValue('');
                ComboStatusADM.setValue('');
                cmbTypeMemo.setValue('');
                ComboTrncu.setValue('');
                //ComboLikeFBasis.setValue('1');
                txtFBasis.setValue('');
                ComboLikeReason.setValue('1');
                txtCodReason.setValue('ALL');
                ComboTypeDocume.setValue('');
                txtIT.setValue('');
                break;
        }
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onSearchexcel: function (f, e) {
        this.imgSearch_clickHandler(true);
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
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2548FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'Approved';
                break;
            case 'U':
                color = '#D8D8D8';
                value = 'Cleared Up';
                break;
            case 'X':
                color = '#FF0000';
                value = 'Void';
                break;
            case 'C':
                color = '#F2F5A9';
                value = 'Condoned';
                break;
            case 'P':
                color = '#81F7BE';
                value = 'Billed';
                break;
            case 'I':
                color = '#BEF781';
                value = 'Billed GDS';
                break;
            case 'F':
                color = '#4DEC8E';
                value = 'Accredited';
                break;
            case 'Z':
                color = '#F8D169';
                value = 'Authorized';
                break;
            case 'R':
                color = '#F2A60D';
                value = 'Reaudited';
                break;
            case 'J':
                color = '#E3DAED';
                value = 'Justified';
                break;
            case 'D':
                color = '#FF9966';
                value = 'Disputed';
                break;
            case 'E':
                color = '#F78181';
                value = 'Rejecte disputed';
                break;
            case 'W':
                color = '#F3EFB6';
                value = 'Approve disputed';
                break;
            case 'B':
                color = '#AAE3E8';
                value = 'Acm\Adm na BSPlink\MM';
                break;
            case 'Y':
                color = '#EFE41B';
                value = 'Pending';
                break;
            case 'N':
                color = '#E5B2B2';
                value = 'Rejected';
                break;
            case 'O':
                color = '#B791EF';
                value = 'IATA disabled';
                break;
            case 'Q':
                color = '#DC7633';
                value = 'Unregistered client';
                break;
            case 'L':
                color = '#FB63A2';
                value = 'Acm BSPlink/MM';
                break;

            case 'G':
                color = '#F3F781';
                value = 'PBD issued';
                break;
            case 'H':
                color = '#FE9A2E';
                value = 'Agreement not reached - to agent';
                break;
            case 'T':
                color = '#F781D8';
                value = 'Agree with airline';
                break;
            case 'K':
                color = '#A9F5BC';
                value = 'Agree with Agent';
                break;
                //{"code": "G", "name": "POST BILLING"},
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
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
     onWinSendMail: function () {
        var win = new Ext.Praxis.view.salesaudit.SalesMasterReportForm.SalesMasterDataEntryEmail({
            params: {
                
            }
        });
        win.show();
    }

});

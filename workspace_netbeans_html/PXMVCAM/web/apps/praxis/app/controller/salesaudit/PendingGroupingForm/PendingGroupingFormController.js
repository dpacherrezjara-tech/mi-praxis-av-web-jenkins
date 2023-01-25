
Ext.define('Ext.Praxis.controller.salesaudit.PendingGroupingForm.PendingGroupingFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PendingGroupingFormController',

    /**
     * Constructor
     */

    beanTMP: {},
    beanEXCEL: {},
    lstCampos: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //alert('Controlador cargado correctamente')
        this.setCountry();
        this.setStoresFilters();
        this.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },

    OnBeforeShow: function () {
        prototype.id = 'PendingGroupingForm';
        prototype.url = CONTEXTPATH + '/PendingGroupingForm';
        prototype.url2 = CONTEXTPATH + '/SalesAuditAccepted';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-cbxFiltro');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "5", "name": "GROUPING"},
                {"code": "3", "name": "IATA"},
                {"code": "2", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "4", "name": "TICKET"}


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
        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING GROUPING"},
                {"code": "A", "name": "WITH GROUPING"}
            ]
        }));

        cmbSearch.setValue('');
        cmbStatus.setValue('');
        CmbSource.setValue('');
    },
    setCountry: function () {
        var me = this;
        var cmbUser = Ext.getCmp(prototype.id + '-txtCountry');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01'
        });
        cmbUser.setStore(store01);
        Ext.Ajax.request({
            url: prototype.url2 + '/obtainDataCombo',
            timeout: 60000000,
            method: 'POST',
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-txtCountry').getStore().loadData(res.lstOperadores);
                me.lstCampos = res.lstCampos;

            }
        });
    },
    onCmbSearchAfterRender4: function (obj) {
        obj.setValue('ALL');
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchgrouping',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);

        // Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },

    OnColumnStatusRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (String(record.get('A3329FLAG')) === 'Void') {
            value = 'red';
        } else if (String(record.get('A3329FLAG')) === 'Pending') {
            value = 'yellow';
        } else {
            value = 'green';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchClick: function (btn) {
        var me = this;

        var cbxFiltro = String(Ext.getCmp(prototype.id + '-cbxFiltro').getValue());
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-txtAudit').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();

        if (cbxFiltro === '') {
            Ext.MessageBox.alert('PRAXIS', 'Select Search Type', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cbxFiltro').focus();", 100);
            });
            return;
        }
        if(txtCountry==='ALL'){
            txtCountry='';            
        }
        if (cbxFiltro === '3') {
            if (txtIATA === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Iata', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtIATA').focus();", 100);
                });
                return;
            }
        }
        if (cbxFiltro === '4') {
            if (txtFrmaSerie === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter TKT', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }
        }
        if (cbxFiltro === '5') {
            if (txtNumber === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Grouping', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtNumber').focus();", 100);
                });
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

        me.beanTMP.VP_OPCION = cbxFiltro;
        me.beanTMP.VP_DATEFROM = txtFilterDateFrom;
        me.beanTMP.VP_DATETO = txtFilterDateTo;
        me.beanTMP.VP_CHANNEL = ComboSource;
        me.beanTMP.VP_COUNTRY = txtCountry;
        me.beanTMP.VP_STATUS = CmbStatus;
        me.beanTMP.VP_USER = txtAudit;
        me.beanTMP.VP_IATA = txtIATA;
        me.beanTMP.VP_TKT = txtFrmaSerie;
        me.beanTMP.VP_SEQ = txtSeq;
        me.beanTMP.VP_COXPADRE = txtNumber;

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        // console.log(this.beanTMP);
        if (btn !== true) {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        }
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = grid01.getStore();

        store01.loadPage(1, {
            params: this.beanTMP,
            callback: function (records, operation, success) {

            }
        });

    },

    onRendererColumDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    btnOK_clickHandler: function () {
        var me = this;
        var lstNew = new Array();
        var vl_fuent = '';
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    vl_fuent = Ext.String.trim(row.get('A3329FUETE'));
                    lstNew.push(row.data);
                } else {
                    if (vl_fuent !== Ext.String.trim(row.get('A3329FUETE')))
                    {
                        Ext.Msg.alert('.: PRAXIS :.', 'You cant not select more than one Source');
                        return;
                    } else {
                        lstNew.push(row.data);
                    }
                }
            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }
        if (lstNew.length > 0) {
            var win = new Ext.Praxis.view.salesaudit.PendingGroupingForm.DataEntryPendingGroupingForm({
                params: {
                    lstSelectedTkts: lstNew,
                    lstComment: me.lstCampos,
                    fuente: vl_fuent,
                    url01: prototype.url
                }
            });
            win.show();
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
            return;
        }


    },

    OnEditActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    },
    onExcelClick: function () {
        var me = this;

         var cbxFiltro = String(Ext.getCmp(prototype.id + '-cbxFiltro').getValue());
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-txtAudit').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();

        if (cbxFiltro === '') {
            Ext.MessageBox.alert('PRAXIS', 'Select Search Type', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cbxFiltro').focus();", 100);
            });
            return;
        }
        if(txtCountry==='ALL'){
            txtCountry='';            
        }
        if (cbxFiltro === '3') {
            if (txtIATA === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Iata', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtIATA').focus();", 100);
                });
                return;
            }
        }
        if (cbxFiltro === '4') {
            if (txtFrmaSerie === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter TKT', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }
        }
        if (cbxFiltro === '5') {
            if (txtNumber === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Grouping', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtNumber').focus();", 100);
                });
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

        me.beanEXCEL.VP_OPCION = cbxFiltro;
        me.beanEXCEL.VP_DATEFROM = txtFilterDateFrom;
        me.beanEXCEL.VP_DATETO = txtFilterDateTo;
        me.beanEXCEL.VP_CHANNEL = ComboSource;
        me.beanEXCEL.VP_COUNTRY = txtCountry;
        me.beanEXCEL.VP_STATUS = CmbStatus;
        me.beanEXCEL.VP_USER = txtAudit;
        me.beanEXCEL.VP_IATA = txtIATA;
        me.beanEXCEL.VP_TKT = txtFrmaSerie;
        me.beanEXCEL.VP_SEQ = txtSeq;
        me.beanEXCEL.VP_COXPADRE = txtNumber;

        if (Ext.Object.getSize(me.beanEXCEL) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                    }
                }
            });
        }
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry');
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource');
        var txtAudit = Ext.getCmp(prototype.id + '-txtAudit');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');



        if (obj.getValue() === "1" || obj.getValue() === "2") {

            txtDateFrom.show();
            txtFilterDateTo.show();
            ///
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtIATA.hide();
            txtNumber.hide();
            ///---
            txtFrmaSerie.setValue('');
            txtSeq.setValue('');
            txtIATA.setValue('');
            txtNumber.setValue('');

        } else if (obj.getValue() === "3") {
            txtIATA.show();
            ///
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            ///---
            txtFrmaSerie.setValue('');
            txtSeq.setValue('');
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');
            txtNumber.setValue('');
        } else if (obj.getValue() === "4") {
            txtCia.show();
            txtFrmaSerie.show();
            txtSeq.show();
            ///
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtIATA.hide();
            txtNumber.hide();
            ///---
            txtIATA.setValue('');
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');
            txtNumber.setValue('');
        } else if (obj.getValue() === "5") {
            txtNumber.show();
            ///
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtIATA.hide();
            ///---
            txtFrmaSerie.setValue('');
            txtSeq.setValue('');
            txtIATA.setValue('');
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');
        } else {
            txtNumber.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtIATA.hide();
            //
            txtNumber.setValue('');
            txtFrmaSerie.setValue('');
            txtSeq.setValue('');
            txtIATA.setValue('');
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');
        }


    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    }

});




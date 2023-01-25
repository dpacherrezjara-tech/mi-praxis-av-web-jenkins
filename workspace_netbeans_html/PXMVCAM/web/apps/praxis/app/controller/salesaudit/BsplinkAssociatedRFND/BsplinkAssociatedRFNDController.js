
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkAssociatedRFND.BsplinkAssociatedRFNDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkAssociatedRFNDController',

    beanTMP: {},

    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
    },

    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        // console.log('Refrescando variables...');
        prototype.id = 'BsplinkAssociatedRFND';
        prototype.id01 = 'DataEntryBsplinkRefundQueryRFND';
        prototype.id02 = 'FormOfPaymentRFND';
        prototype.id03 = 'OriginalDataTaxesRFND';
        prototype.idSabreEstatus = 'FormSabreEstatus';
        prototype.url = CONTEXTPATH + '/BwrBSPLINKRFND';
        prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
        prototype.widthContenedor = 1366;
        prototype.heightContenedor = 768;

        // console.log(prototype);
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente...')
        this.setUser();
        this.setStoresFilters();
        // this.onLoadUsers();
        this.setStoresGrids();
        // Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/getUser',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-txtUser').setValue(Ext.String.trim(res.user.USR));
                if (Ext.String.trim(res.user.USR) === 'XEILIANA' || Ext.String.trim(res.user.USR) === 'SAP26') {
                    Ext.getCmp(prototype.id + '-txtUser').setReadOnly(false);
                }
                me.onSearchClickInitial();

            }
        });
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "5", "name": "AGENCY"},
                {"code": "4", "name": "APPLICATION DATE"},
                {"code": "2", "name": "DOCUMENT"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ASSIGNED TO THE AUDITOR"},
                {"code": "B", "name": "CHANGE FOR ANOTHER"},
                {"code": "C", "name": "INCONSISTENCY WITH THE ROBOT"},
                {"code": "E", "name": "ERROR IN THE PROCESS"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "J", "name": "EXEC. OF THE ROBOT"},
                {"code": "Y", "name": "PENDING"},
                {"code": "R", "name": "REJECTED"},
                {"code": "D", "name": "REEMBOLSABLE"},
                {"code": "G", "name": "NO REEMBOLSABLE"},
                {"code": "X", "name": "REMOVED"},
                {"code": "Z", "name": "UNDER INVESTIGATION"},
                {"code": "K", "name": "CPN EVALUATION"}
            ]
        }));
    },

    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.id + '-txtUser');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url01 + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbUser.setValue('ALL');
                }
            }
        });
        cmbUser.setStore(store);
    },

    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchQueryRefund',
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

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },

    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },

    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        // console.log(String(newValue))
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtHora1 = Ext.getCmp(prototype.id + '-txthora1');
        var txtHora2 = Ext.getCmp(prototype.id + '-txthora2');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtForma = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var cmbCountry2 = Ext.getCmp(prototype.id + '-cmbCountry2');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var txtCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        var txtUser = Ext.getCmp(prototype.id + '-txtUser');

        var boxFilter02 = Ext.getCmp(prototype.id + '-box-filter-02');
        switch (String(newValue)) {
            case '1':
            case '4':
                txtDateFrom.show();
                txtDateTo.show();
                boxFilter02.show();

                cmbCountry2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();
                txtIATA.hide();

                txtNumber.setValue('');
                break;
            case '2':
                txtCia.show();
                txtNumber.show();
                cmbCountry2.show();
                boxFilter02.show();

                txtForma.hide();
                txtSeq.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();

                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                txtForma.setValue('');
                break;
            case '3':
                txtCia.show();
                txtForma.show();
                txtSeq.show();
                boxFilter02.show();

                cmbCountry2.hide();
                txtNumber.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                break;
            case '5':
                txtIATA.show();
                boxFilter02.show();

                txtDateFrom.hide();
                txtDateTo.hide();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();
                cmbCountry2.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtForma.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                break;
            default:
                txtIATA.hide();
                cmbStatus.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtHora1.hide();
                txtHora2.hide();
                txtCia.hide();
                txtForma.hide();
                txtSeq.hide();
                txtNumber.hide();

                boxFilter02.hide();
        }
    },

    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },

    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },
    onSearchClickInitial: function (btn) {
        var me = this;

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        me.beanTMP.IN_DOCUMET = '';
        me.beanTMP.IN_CIA = '';
        me.beanTMP.IN_FORMA = '';
        me.beanTMP.IN_SERIE = '';
        me.beanTMP.IN_SEQ = '';
        me.beanTMP.IN_DATEFROM = '';
        me.beanTMP.IN_DATETO = '';
        me.beanTMP.IN_OPTION = '';
        me.beanTMP.IN_STATUS = '';
        me.beanTMP.IN_COUNTRY = '';
        me.beanTMP.IN_USER = Ext.getCmp(prototype.id + '-txtUser').getValue('');
        ;
        me.beanTMP.IN_IATA = '';


        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                Ext.getCmp(prototype.id + '-pagination').enable();
            }
        });

    },

    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());

        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }

        if (comboBy === '1' || comboBy === '4') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                    return;
                }
            }
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
                if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                    return;
                }
            }

            /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
             Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
             if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
             Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
             return;
             }
             }*/
        }

        if (comboBy === '2' || comboBy === '3' || comboBy === '5') {
            if (comboBy == '2') {
                me.beanTMP.IN_DOCUMET = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());
            } else {
                me.beanTMP.IN_DOCUMET = '';
            }
            if (comboBy == '3') {
                me.beanTMP.IN_CIA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtCia').getValue());
                me.beanTMP.IN_FORMA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(0, 4));
                me.beanTMP.IN_SERIE = Ext.String.trim(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substr(4, 10));
                me.beanTMP.IN_SEQ = Ext.String.trim(Ext.getCmp(prototype.id + '-txtSeq').getValue());
            } else {
                me.beanTMP.IN_CIA = '';
                me.beanTMP.IN_FORMA = '';
                me.beanTMP.IN_SERIE = '';
                me.beanTMP.IN_SEQ = '';
            }
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_DATETO = '';
        }

        if (comboBy == '1' || comboBy == '4') {
            me.beanTMP.IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
            me.beanTMP.IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();

            me.beanTMP.IN_CIA = '';
            me.beanTMP.IN_DOCUMET = '';
            me.beanTMP.IN_FORMA = '';
            me.beanTMP.IN_SERIE = '';
            me.beanTMP.IN_SEQ = '';
        }

        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        me.beanTMP.IN_COUNTRY = Ext.String.trim(Ext.getCmp(prototype.id + '-cmbCountry').getValue());
        me.beanTMP.IN_USER = Ext.String.trim(Ext.getCmp(prototype.id + '-txtUser').getValue());
        me.beanTMP.IN_IATA = Ext.String.trim(Ext.getCmp(prototype.id + '-txtIATA').getValue());

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        store.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {
                Ext.getCmp(prototype.id + '-pagination').enable();
            }
        });

    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },

    onRendererColumnAgency: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnPassenger: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    ToGB2312: function (str) {
        var cadena = str.replace(/\\u/gi, '%u');
        cadena = cadena.replace(/\\n/gi, "\n");
        cadena = cadena.replace(/\\t/gi, "\t");
        return unescape(cadena);
    },
    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        if (record.get('A3389PAIS') === 'CN') {
            metaData.tdAttr = 'data-qtip="' + me.ToGB2312(value) + '"';
        } else {
            metaData.tdAttr = 'data-qtip="' + value + '"';
        }
        return value;
    },

    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3389FLAG'))) {
            case 'A':
                color = '#81BEF7';
                value = 'ASSIGNED TO AUDITOR';
                break;
            case 'R':
                color = '#F78181';
                value = 'REJECTED';
                break;
            case 'F':
                color = '#81F781';
                value = 'AUTHORISED';
                break;
            case 'Y':
                color = '#CCFF00';
                value = 'PENDING';
                break;
            case 'X':
                color = '#FF0000';
                value = 'VOID';
                break;
            case 'D':
                color = '#FF9966';
                value = 'REEMBOLSABLE';
                break;
            case 'J':
                color = '#69D3F8';
                value = 'EXEC. OF THE ROBOT';
                break;
            case 'G':
                color = '#0099FF';
                value = 'NO REEMBOLSABLE';
                break;
            case 'B':
                color = '#CC9966';
                value = 'CHANGE FOR ANOTHER';
                break;
            case 'C':
                color = '#D329E8';
                value = 'INCONSISTENCY WITH THE ROBOT';
                break;
            case '':
                color = '#FF0000';
                value = 'PENDING DOWNLOAD';
                break;
            case 'E':
                color = '#F2A60D';
                value = 'ERROR IN THE PROCESS';
                break;
            case 'Z':
                color = '#CCFF00';
                value = 'UNDER INVESTIGATION';
                break;
            case 'K':
                color = '#E3DAED';
                value = 'CPN EVALUATION';
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },

    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3389SEMAF'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('FORMASSOCIATEDRFND', rec);
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },

    winDataEntry: function (action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url01,
                url02: prototype.url
            }
        });
        win.show();
    },

    onExcelClick: function (obj) {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },

});


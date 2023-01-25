
Ext.define('Ext.Praxis.controller.salesaudit.QueryPostbilling.QueryPostbillingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.QueryPostbillingController',
    /**
     * Constructor
     */
    beanTMP: {},
    beanSPCRDR: {},
    init: function (view) {
        var me = this;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.id = 'QueryPostbilling';
        prototype.id1 = 'DataEntryBsplinkRefundQueryRFND';
        prototype.url = CONTEXTPATH + '/Postbilling';
        prototype.url2 = CONTEXTPATH + '/SpdrspcrQuery';
        prototype.url3 = CONTEXTPATH + '/ADMReport';
        prototype.id1 = 'SeguimietoFormUnico';
        prototype.id0 = 'DocumListAdmsController';
        prototype.id03 = CONTEXTPATH + '/PostbillingFileViewer';
        prototype.widthContenedor = 1366;
        prototype.heightContenedor = 768;


        // console.log(prototype);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // alert('Controlador cargado correctamente...')
        var me = this;
        me.setStoresFilters();
        // this.onLoadUsers();
        me.setStoresGrids();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbTRNCU = Ext.getCmp(prototype.id + '-CmbTRNCU');
        var CmbProcessstatus = Ext.getCmp(prototype.id + '-CmbProcessstatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "AGENCY"},
                {"code": "2", "name": "PBD DATE"},
                {"code": "3", "name": "DOCUMENT"},
                {"code": "4", "name": "SYSTEM DATE"},
                {"code": "5", "name": "SPDR"},
                {"code": "6", "name": "SPCR"},
                {"code": "7", "name": "ISSUE DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PBD", "name": "PBD ISSUED"},
                {"code": "DAG", "name": "DISAGREE WITH AGENT"},
                {"code": "DAA", "name": "DISAGREE WITH AIRLINE"},
                {"code": "AAG", "name": "AGREE WITH AGENT"},
                {"code": "AAA", "name": "AGREE WITH AIRLINE"},
                {"code": "PRS", "name": "PBD REASON SENT"}
                //{"code": "PRA", "name": "ASK AGENCY QUESTIONS"}
            ]
        }));

        cmbTRNCU.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADMA", "name": "ADMA"},
                {"code": "ACMA", "name": "ACMA"},
                {"code": "EMDS", "name": "EMDS"},
                {"code": "EMDA", "name": "EMDA"},
                {"code": "TKTT", "name": "TKTT"},
                {"code": "RFND", "name": "RFND"}


            ]
        }));

        CmbProcessstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING TO WORK"},
                {"code": "P", "name": "PENDING SEND"},
                {"code": "B", "name": "SENT TO BSPLINK"},
                {"code": "E", "name": "ERROR SENDING TO BSPLINK"}
            ]
        }));


    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchQueryPostbilling',
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
        obj.setValue('4');
    },
    onCmbSearchChange: function (obj, newValue, oldValue, eOpts) {
        // console.log(String(newValue))
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var cmbCountry2 = Ext.getCmp(prototype.id + '-cmbCountry2');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var txtCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        var txtUser = Ext.getCmp(prototype.id + '-txtUser');


        var boxFilter02 = Ext.getCmp(prototype.id + '-box-filter-02');
        switch (String(newValue)) {
            case '2':
            case '4':
            case '7':
                txtDateFrom.show();
                txtDateTo.show();
                boxFilter02.show();
                cmbStatus.show();

                cmbCountry2.hide();
                txtNumber.hide();
                txtIATA.hide();

                txtNumber.setValue('');
                txtIATA.setValue('');
                txtCountry.setValue('');
                cmbCountry2.setValue('');
                txtUser.setValue('');
                break;
            case '3':
            case '5':
            case '6':
                txtNumber.show();
                cmbCountry2.show();
                boxFilter02.hide();

                txtDateFrom.hide();
                txtDateTo.hide();
                txtIATA.hide();
                cmbStatus.hide();

                txtIATA.setValue('');
                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtCountry.setValue('');
                txtUser.setValue('');
                break;
            case '1':
                txtIATA.show();
                boxFilter02.show();
                cmbStatus.show();

                txtDateFrom.hide();
                txtDateTo.hide();
                txtNumber.hide();
                cmbCountry2.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                cmbCountry2.setValue('');
                txtUser.setValue('');
                txtIATA.setValue('');
                break;
            default:
                txtIATA.hide();
                cmbStatus.hide();
                txtDateFrom.hide();
                txtDateTo.hide();
                txtNumber.hide();

                boxFilter02.hide();

                txtDateFrom.setValue('');
                txtDateTo.setValue('');
                txtNumber.setValue('');
                txtCountry.setValue('');
                cmbCountry2.setValue('');
                txtIATA.setValue('');
                txtUser.setValue('');
        }
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },
    onSearchClick: function (btn) {
        var me = this;
        var form = Ext.getCmp(prototype.id + '-contenedor-filters-form').getForm();

        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        var CmbProcessstatus = Ext.getCmp(prototype.id + '-CmbProcessstatus').getValue();
        var comboTRNCU = String(Ext.getCmp(prototype.id + '-CmbTRNCU').getValue());
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }

        if (comboBy === '2' || comboBy === '4' || comboBy === '7') {
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

        if (comboBy === '5' || comboBy === '3' || comboBy === '6') {
            me.beanTMP.IN_DOCUMET = Ext.String.trim(Ext.getCmp(prototype.id + '-txtNumber').getValue());
            me.beanTMP.IN_DATEFROM = '';
            me.beanTMP.IN_DATETO = '';
            me.beanTMP.IN_CIA = '';
            me.beanTMP.IN_FORMA = '';
            me.beanTMP.IN_SERIE = '';
            me.beanTMP.IN_SEQ = '';
        }

        if (comboBy === '2' || comboBy === '4' || comboBy === '7') {
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
        me.beanTMP.IN_TRNCU = comboTRNCU;
        me.beanTMP.IN_STATO = CmbProcessstatus;

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
    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3537FLAG'))) {
            case 'Agree with Airline':
                color = '#F781D8';
                break;
            case 'Agree with Agent':
                color = '#A9F5BC';
                break;
            case 'Disagree with Airline':
                color = '#F78181';
                break;
            case 'PBD REASON SENT':
                color = '#A9D0F5';
                break;
            case '':
                color = '#FF0000';
                value = 'PENDING DOWNLOAD';
                break;
            case 'Disagree with Agent':
                color = '#F6CED8';
                break;
            case 'PBD Issued':
                color = '#F3F781';
                break;
            case 'Agreement not reached - to Agent':
                color = '#FE9A2E';
                break;
            case 'Pending Agent':
                color = '#58FAF4';
                break;
            case 'Pending Airline':
                color = '#F78181';
                break;


        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
        /*
         
         case 'B':
         color = '#CC9966';
         value = 'CHANGE FOR ANOTHER';
         break;
         case 'Disagree with Agent':
         color = '#E8400C';
         break;
         case 'F':
         color = '#A50C88';
         value = 'AUTHORISED';
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
         value = '';
         break;*/
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3537SEMAF'))) {
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
        this.winDataEntry('FORMASQUERYPOSTBILLING', rec);
    },
    winDataEntry: function (action, rec) {
        //console.log(prototype.url);
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.Postbilling.DetailPostbilling({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url
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
                        global.getFile(prototype.url + '/getXLSX2?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onRendererColumnOnSPDR: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: prototype.url2 + '/SearchConexion',
            timeout: 60000000,
            params: {
                IN_OPTION: '2',
                IN_DOCUMET: rec.data.A3537PREDR,
                IN_DATEFROM: '',
                IN_DATETO: '',
                IN_COUNTRY: rec.data.A3537PAIS,
                IN_STATUS: '',
                IN_IATA: ''
            },
            success: function (response, options, success) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                if (res.data.length > 0) {
                    if (res.data[0].A3540NMEMO !== '') {
                        me.winDataEntrySPCRDR(res.data[0]);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});
                    }
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }

            }
        });


    },
    onRendererColumnOnSPCR: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail02(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail02: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: prototype.url2 + '/SearchConexion',
            timeout: 60000000,
            params: {
                IN_OPTION: '2',
                IN_DOCUMET: rec.data.A3537PRECR,
                IN_DATEFROM: '',
                IN_DATETO: '',
                IN_COUNTRY: rec.data.A3537PAIS,
                IN_STATUS: '',
                IN_IATA: ''
            },
            success: function (response, options, success) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                if (res.data.length > 0) {
                    if (res.data[0].A3540NMEMO !== '') {
                        me.winDataEntrySPCRDR(res.data[0]);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});
                    }
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });


    },
    winDataEntrySPCRDR: function (rec) {
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SpdrspcrQuery.DetailSpdrspcrQuery({
            params: {
                rec: rec,
                option: '2'
            }
        });
        win.show();
    },
    onRendererColumnOnCon: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail03(' + rowIndex + ');">' + value + '</span>'
    },

    OnDetail03: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.DocumListAdms({
            params: {
                rec: rec,
                url01: prototype.url,
                url02: prototype.url3
            }
        });
        win.show();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onClearClick:function(){
        var grid = Ext.getCmp(prototype.id + '-grid');
        var store = grid.getStore();
        store.removeAll();
    }




});


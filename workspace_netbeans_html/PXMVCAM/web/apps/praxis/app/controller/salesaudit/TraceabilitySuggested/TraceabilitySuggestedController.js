
Ext.define('Ext.Praxis.controller.salesaudit.TraceabilitySuggested.TraceabilitySuggestedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TraceabilitySuggestedController',

    /**
     * Constructor
     */
    beanGeneral: {},
    beanDatos: {},
    beandetail: {},
    beanreport: {},
    beanPendin: {},
    vl_agencia: '',
    totalPoce: 0,
    total2018: 0,
    total2019: 0,
    total2020: 0,
    total2021: 0,
    totalaver2018: 0,
    totalaver2019: 0,
    totalaver2020: 0,
    totalaver2021: 0,
    init: function (view) {
        var me = this;

    },
    OnBeforeShow: function () {
        prototype.id = 'TraceabilitySuggested';
        prototype.url = CONTEXTPATH + '/TraceabilitySuggested';
        prototype.id1 = 'SeguimietoFormUnico';
        prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
        prototype.id4 = 'FormUnicoSeguimieto';
        prototype.id6 = 'ADMSeguimietoSubiArchivo';
        prototype.widthWindow = 1430;
        prototype.heightWindow = 768;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGrids();
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbType = Ext.getCmp(prototype.id + '-Type');
        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "PROCESSING DATE"},
                {"code": "2", "name": "IATA"}
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

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "STATUS"},
                {"code": "2", "name": "REASON"},
                {"code": "3", "name": "IATA"}
                //{"code": "3", "name": "TRANSACTION"}
            ]
        }));

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbDateAfterRender: function (obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbMonthAfterRender: function (obj) {
        var fecha = new Date();
        fecha = fecha.getMonth() + 1;
        if (fecha <= 9) {
            fecha = 0 + '' + fecha.toString();
        } else {
            fecha = fecha.toString();
        }
        ;
        obj.setValue(win.getAbreviaturaMes(fecha));
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridReport');
        var grid02 = Ext.getCmp(prototype.id + '-gridReport2');
        var grid03 = Ext.getCmp(prototype.id + '-gridReport3');
        var grid04 = Ext.getCmp(prototype.id + '-gridAdmreport');
        var grid05 = Ext.getCmp(prototype.id + '-gridReportReason');
        var grid06 = Ext.getCmp(prototype.id + '-gridDataSugges');
        var grid07 = Ext.getCmp(prototype.id + '-gridReportIata');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid04'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid05'
        });
        var store06 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid06'
        });
        var store07 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid07'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);
        grid06.setStore(store06);
        grid07.setStore(store07);
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onSearchpdf: function (f, e) {
        this.imgSearch_clickHandler(true);
    },
    onCmbSelect: function (obj, records, eOpts) {
        Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridReport2').getStore().removeAll();
        var gridReport1 = Ext.getCmp(prototype.id + '-gridReport');
        var gridReport2 = Ext.getCmp(prototype.id + '-gridReport2');
        if (obj.getValue() === '1') {
            gridReport1.columns[0].setVisible(true);
            gridReport1.columns[1].setVisible(false);
            gridReport1.columns[2].setVisible(false);
            gridReport1.columns[3].setVisible(false);
            //2 grid
            gridReport2.columns[0].setVisible(true);
            gridReport2.columns[1].setVisible(false);
            gridReport2.columns[2].setVisible(false);
            gridReport2.columns[3].setVisible(false);
        } else {
            gridReport1.columns[0].setVisible(false);
            gridReport1.columns[1].setVisible(true);
            gridReport1.columns[2].setVisible(true);
            gridReport1.columns[3].setVisible(true);
            //2
            gridReport2.columns[0].setVisible(false);
            gridReport2.columns[1].setVisible(true);
            gridReport2.columns[2].setVisible(true);
            gridReport2.columns[3].setVisible(true);
        }
    },
    imgSearch_clickHandler: function (obj, e) {
        var fecha = new Date().getFullYear();
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var ComboSource = '';//Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var checkbox = '0';

        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();


        if (Ext.getCmp(prototype.id + '-Summary').getValue()) {
            checkbox = '1';
        }

        if (ComboBy === '') {
            global.Msg({msg: 'SELECT Of By'});
            return;
        }
        if (txtFilterDateFrom === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtFilterDateTo === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (cmbDateFromMonth === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cmbDateFromMonth').focus();", 100);
            });
            return;
        }
        if (cmbDateToMonth === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cmbDateToMonth').focus();", 100);
            });
            return;
        }

        /*validaciones de fecha cmbDateFromMonth  cmbDateFromMonth  txtFilterDateTo cmbDateFromMonth*/
        if (fecha < txtFilterDateFrom || fecha < txtFilterDateTo) {
            Ext.MessageBox.alert('PRAXIS', "The year must be less than the one enteredm.");
            return;
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {
            if (txtFilterDateTo < txtFilterDateFrom) {
                Ext.MessageBox.alert('PRAXIS', "The Year To must be greater than Year From.");
                return;
            }
        }
        /* fin de la validaciones de la fech*/

        this.beanGeneral.VP_OPTION = ComboBy;
        this.beanGeneral.VP_DATEFROM = txtFilterDateFrom + '' + win.getMonthAbbreviation(cmbDateFromMonth);
        this.beanGeneral.VP_DATETO = txtFilterDateTo + '' + win.getMonthAbbreviation(cmbDateToMonth);
        this.beanGeneral.VP_COUNTRY = txtcountry;
        this.beanGeneral.VP_IATA = txtIATA;
        this.beanGeneral.VP_SOURCE = ComboSource;
        this.beanGeneral.checkbox = checkbox;
        //SQP00989Filter
        this.TraceabilitySearch(this.beanGeneral, obj === true ? obj : false);
    },
    TraceabilitySearch: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getpdf?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
            Ext.Ajax.request({
                url: prototype.url + '/search/',
                method: 'POST',
                timeout: '60000000',
                params: {
                    beanString: JSON.stringify(bean)
                },
                success: function (response, options) {
                    Ext.getCmp(prototype.id + '-Contenedor').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridReport2').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridReport').getStore().loadData(res.lst_reporte1);
                    Ext.getCmp(prototype.id + '-gridReport2').getStore().loadData(res.lst_reporte1);
                    me.beanDatos = res.lst_reporte1;
                    me.onCreateChartReal(res.lst_reporte1);

                }
            });

        }

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
    /*exportExcel: function (obj) {
     if (Ext.Object.getSize(obj) > 0) {
     Ext.Msg.show({
     title: '.:PRAXIS:.',
     msg: 'Download Pdf ?',
     buttons: Ext.MessageBox.OKCANCEL,
     scope: this,
     icon: Ext.MessageBox.QUESTION,
     modal: true,
     fn: function (btn) {
     if (btn === 'ok') {
     global.getFile(prototype.url + '/getpdf?beanString=' + encodeURI(JSON.stringify(obj)) + '&VP_DATEFROM=' + this.beanGeneral.VP_DATEFROM + '&VP_DATETO=' + this.beanGeneral.VP_DATETO);
     }
     }
     });
     }
     },*/
    onRendererColumnCorreo: function (value, metaData, record, rowIndex, colIndex, store, view) {
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
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnIntSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    OnColumnIntRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },
    OnColumnIntRenderer2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000');
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('SNCAMBIO', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'SNCAMBIO' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.screens.ScrFormUnico({
            params: {
                action: action,
                VP_PREME: rec.get('A2548PREME'),
                //rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },
    onClearClick: function () {
        Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridReport2').getStore().removeAll();
        Ext.getCmp(prototype.id + '-search-type').setValue('');
        Ext.getCmp(prototype.id + '-country').setValue('');
        Ext.getCmp(prototype.id + '-ComboSource').setValue('');
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
    },
    OnColumnPendienteDateRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value !== 0) {
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().search_pendinte_form_detalle(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000') + '</span>';
        } else {
            return Ext.util.Format.number(value, '0,000');
        }

    },
    search_pendinte_form_detalle: function (rowIndex) {
        var me = this;
        var gridReport1 = Ext.getCmp(prototype.id + '-tabpanelPrincipal');
        var gridReport2 = Ext.getCmp(prototype.id + '-CABgridReport6');

        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var btnpdf = Ext.getCmp(prototype.id + '-btn-excel');
        var btnsearch = Ext.getCmp(prototype.id + '-btn-search');
        var contenedor = Ext.getCmp(prototype.id + '-contenedor-filters');
        var CABgridReport4 = Ext.getCmp(prototype.id + '-CABgridReport4');
        var btnback2 = Ext.getCmp(prototype.id + '-btn-back2');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var excel3 = Ext.getCmp(prototype.id + '-btn-excel3');
        var excel4 = Ext.getCmp(prototype.id + '-btn-excel4');

        gridReport1.hide();
        gridReport2.show();
        pagginator.show();
        excel3.show();
        btnback.show();
        btnpdf.hide();
        btnsearch.hide();
        contenedor.hide();
        CABgridReport4.hide();
        btnback2.hide();
        excel4.hide();

        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        //console.log('LOBITO' + cmbDateFromMonth);
        me.beanPendin.OPCION = '2';
        if (Ext.getCmp(prototype.id + '-search-type').getValue() === '1') {
            me.beanPendin.DATEFROM = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '01';
            me.beanPendin.DATETO = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '31';
            me.beanPendin.A1672AGENT = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        } else {
            me.beanPendin.DATEFROM = me.beanGeneral.VP_DATEFROM + '01';
            me.beanPendin.DATETO = me.beanGeneral.VP_DATETO + '31';
            me.beanPendin.A1672AGENT = data.A1672AGENT;
        }


        me.beanPendin.A1672FUENT = "";
        me.beanPendin.A1672CANAL = "";
        me.beanPendin.A1672TDOC = "";
        me.beanPendin.A1672TRNCU = "";
        me.beanPendin.A1672ITIN = "";
        me.beanPendin.A1672FBASI = "";
        me.beanPendin.BOOKFROM = "";
        me.beanPendin.BOOKTO = "";
        me.beanPendin.LIKEFBASIS = "";
        me.beanPendin.LIKEREASON = "";
        me.beanPendin.MONTO = 0;
        me.beanPendin.Agent = "";
        me.beanPendin.strTicket = "";
        me.beanPendin.REASONS = "";
        me.beanPendin.A1672PAIVT = "";
        Ext.getCmp(prototype.id + '-gridDataSugges').getStore().removeAll();
        Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchDetailPendiente/',
            method: 'POST',
            timeout: '300000',
            params: me.beanPendin,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.length !== 0) {
                    Ext.getCmp(prototype.id + '-gridDataSugges').getStore().loadData(res.data);
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(res.total);

                } else {
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText("0");
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }


            }
        });


    },
    imgExcel_clickHandler2: function (obj, e) {
        var me = this;
        if (me.beanPendin.DATEFROM === '') {
            global.Msg({msg: "PRAXIS: Debe de exitir algun registro disponible para exportar", icon: 2, fn: function () {
                }});
        }
        me.exportExcel(prototype.url + '/getXLSX?A1672PAIVT=' + me.beanPendin.A1672PAIVT + '&REASONS=' + me.beanPendin.REASONS + '&strTicket=' + me.beanPendin.strTicket + '&MONTO=' + me.beanPendin.MONTO + '&OPCION=' + me.beanPendin.OPCION + '&DATEFROM=' + me.beanPendin.DATEFROM + '&DATETO=' + me.beanPendin.DATETO + '&A1672FUENT=' + me.beanPendin.A1672FUENT + '&A1672CANAL=' + me.beanPendin.A1672CANAL + '&A1672TDOC=' + me.beanPendin.A1672TDOC + '&A1672TRNCU=' + me.beanPendin.A1672TRNCU + '&A1672AGENT=' + bean.A1672AGENT + '&A1672ITIN=' + me.beanPendin.A1672ITIN + '&A1672FBASI=' + me.beanPendin.A1672FBASI + '&BOOKFROM=' + me.beanPendin.BOOKFROM + '&BOOKTO=' + me.beanPendin.BOOKTO + '&LIKEFBASIS=' + me.beanPendin.LIKEFBASIS + '&LIKEREASON=' + me.beanPendin.LIKEREASON + '&Agent=' + me.beanPendin.Agent);

    },
    imgExcel_clickHandler3: function (obj, e) {
        var me = this;
        if (me.beandetail.VP_DATEFROM === '') {
            global.Msg({msg: "PRAXIS: Debe de exitir algun registro disponible para exportar", icon: 2, fn: function () {
                }});
        }
         me.exportExcel(prototype.url + '/getXLSXProcessingDate?beanString=' + encodeURI(JSON.stringify(me.beandetail)));
    },
    OnColumnRechazoDateRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value !== 0) {
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().search_rechazo_form_detalle(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000') + '</span>';
        } else {
            return Ext.util.Format.number(value, '0,000');
        }

    },
    search_rechazo_form_detalle: function (rowIndex) {
        var me = this;
        var gridReport1 = Ext.getCmp(prototype.id + '-tabpanelPrincipal');
        var gridReport2 = Ext.getCmp(prototype.id + '-CABgridReport6');

        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var btnpdf = Ext.getCmp(prototype.id + '-btn-excel');
        var btnsearch = Ext.getCmp(prototype.id + '-btn-search');
        var contenedor = Ext.getCmp(prototype.id + '-contenedor-filters');
        var CABgridReport4 = Ext.getCmp(prototype.id + '-CABgridReport4');
        var btnback2 = Ext.getCmp(prototype.id + '-btn-back2');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var excel3 = Ext.getCmp(prototype.id + '-btn-excel3');
        var excel4 = Ext.getCmp(prototype.id + '-btn-excel4');

        gridReport1.hide();
        gridReport2.show();
        pagginator.show();
        excel3.show();
        btnback.show();
        btnpdf.hide();
        btnsearch.hide();
        contenedor.hide();
        CABgridReport4.hide();
        btnback2.hide();
        excel4.hide();

        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        me.beanPendin.OPCION = '2';
        if (Ext.getCmp(prototype.id + '-search-type').getValue() === '1') {
            me.beanPendin.DATEFROM = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '01';
            me.beanPendin.DATETO = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '31';
            me.beanPendin.A1672AGENT = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        } else {
            me.beanPendin.DATEFROM = me.beanGeneral.VP_DATEFROM + '01';
            me.beanPendin.DATETO = me.beanGeneral.VP_DATETO + '31';
            me.beanPendin.A1672AGENT = data.A1672AGENT;
        }

        me.beanPendin.BOOKTO = "N";
        Ext.getCmp(prototype.id + '-gridDataSugges').getStore().removeAll();
        Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchDetailPendiente/',
            method: 'POST',
            timeout: '300000',
            params: me.beanPendin,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.length !== 0) {
                    Ext.getCmp(prototype.id + '-gridDataSugges').getStore().loadData(res.data);
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(res.total);

                } else {
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText("0");
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }


            }
        });


    },
    OnColumnProcessingDateRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000') + '</span>';
    },
    searchform_detalle: function (rowIndex) {
        var me = this;
        var gridType = Ext.getCmp(prototype.id + '-Type').getValue();
        if (gridType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-Type').focus();", 100);
            });
            return;
        }

        var gridReport1 = Ext.getCmp(prototype.id + '-tabpanelPrincipal');
        var gridReport3 = Ext.getCmp(prototype.id + '-CABgridReport3');
        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var btnpdf = Ext.getCmp(prototype.id + '-btn-excel');
        var excel4 = Ext.getCmp(prototype.id + '-btn-excel4');
        var btnsearch = Ext.getCmp(prototype.id + '-btn-search');
        var contenedor = Ext.getCmp(prototype.id + '-contenedor-filters');
        var CABgridReport4 = Ext.getCmp(prototype.id + '-CABgridReport4');
        var btnback2 = Ext.getCmp(prototype.id + '-btn-back2');
        var CABgridReport5 = Ext.getCmp(prototype.id + '-CABgridReport5');
        var CABgridReport7 = Ext.getCmp(prototype.id + '-CABgridReport7');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var cmbDateFromMonth = win.getMonthAbbreviationMes(cmbDateFromMonth);
        var cmbDateToMonth = win.getMonthAbbreviationMes(cmbDateToMonth);

        gridReport1.hide();
        btnback.show();
        btnpdf.hide();
        btnsearch.hide();
        contenedor.hide();
        CABgridReport4.hide();
        btnback2.hide();
        excel4.show();

        if (gridType === '1') {
            gridReport3.show();
            CABgridReport5.hide();
            CABgridReport7.hide();
        }
        if (gridType === '2') {
            CABgridReport5.show();
            gridReport3.hide();
            CABgridReport7.hide();
        }
        if (gridType === '3') {
            CABgridReport7.show();
            gridReport3.hide();
            CABgridReport5.hide();
        }


        /*
         {"code": "1", "name": "STATUS"},
         {"code": "2", "name": "REASON"},
         {"code": "3", "name": "TRANSACTION"}
         */
        me.vl_agencia = '';
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        me.beandetail.VP_OPTION = gridType;
        if (Ext.getCmp(prototype.id + '-search-type').getValue() === '1') {
            me.beandetail.VP_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
            me.beandetail.VP_DATEFROM = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '01';
            me.beandetail.VP_DATETO = data.A1672FPROC.substr(0, 4) + "" + win.getMonthAbbreviation(data.A1672FPROC.substr(4, 3)) + '31';
        } else {
            me.beandetail.VP_IATA = data.A1672AGENT;
            me.beandetail.VP_DATEFROM = txtFilterDateFrom + '' + win.getMonthAbbreviation(cmbDateFromMonth) + '01';
            me.beandetail.VP_DATETO = txtFilterDateTo + '' + win.getMonthAbbreviation(cmbDateToMonth) + '31';
        }
        me.vl_agencia = me.beandetail.VP_IATA;

        //me.beandetail.VP_DATEFROM = data.A1672FPROC + '01';
        //me.beandetail.VP_DATETO = data.A1672FPROC + '31';

        me.beandetail.VP_GROUP = data.CANTADMPENGROUP;
        me.beandetail.VP_CLIE = data.CANTADMSINCLIE;
        me.beandetail.VP_JUSTI = data.CANTADMJUSTI;
        me.beandetail.VP_AUTORI = data.CANTADMAUTORI;
        me.beandetail.VP_DISABLE = data.CANTADMIATADISA;
        me.beandetail.VP_GDS = data.CANTADMGDS;

        Ext.getCmp(prototype.id + '-gridReport3').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridReportReason').getStore().removeAll();
        Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchDetail',
            method: 'POST',
            timeout: '300000',
            params: {
                beanString: JSON.stringify(me.beandetail)
            },
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.length !== 0) {
                   // var Objtemp = res[0].data;
                    //var Objtemp = records[0].data;
                    if (gridType === '1') {
                        Ext.getCmp(prototype.id + '-gridReport3').getStore().loadData(res.data);
                    }
                    if (gridType === '2') {
                        Ext.getCmp(prototype.id + '-gridReportReason').getStore().loadData(res.data);
                    }
                    if (gridType === '3') {
                        Ext.getCmp(prototype.id + '-gridReportIata').getStore().loadData(res.data);
                    }

                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }


            }
        });


    },
    onBackClick: function (obj, e) {

        var me = this;
        var gridReport1 = Ext.getCmp(prototype.id + '-tabpanelPrincipal');
        var gridReport3 = Ext.getCmp(prototype.id + '-CABgridReport3');
        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var btnpdf = Ext.getCmp(prototype.id + '-btn-excel');
        var excel4 = Ext.getCmp(prototype.id + '-btn-excel4');
        var btnsearch = Ext.getCmp(prototype.id + '-btn-search');
        var contenedor = Ext.getCmp(prototype.id + '-contenedor-filters');
        var CABgridReport5 = Ext.getCmp(prototype.id + '-CABgridReport5');
        var CABgridReport6 = Ext.getCmp(prototype.id + '-CABgridReport6');
        var CABgridReport7 = Ext.getCmp(prototype.id + '-CABgridReport7');
        var excel3 = Ext.getCmp(prototype.id + '-btn-excel3');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        gridReport1.show();
        gridReport3.hide();
        CABgridReport5.hide();
        CABgridReport6.hide();
        CABgridReport7.hide();
        excel3.hide();
        pagginator.hide();
        excel4.hide();

        btnback.hide();
        btnpdf.show();
        btnsearch.show();
        contenedor.show();
    },
    OnColumnApplicationRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalleReport(' + rowIndex + ');">' + value + '</span>';
    },
    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548BASE'))) {
            case 'PR':
                value = 'Proceso Regular';
                break;
            case 'UP':
                value = 'UpFront';
                break;
            case 'BF':
                value = 'Backend Flown';
                break;
            case 'BS':
                value = 'Backend Sale';
                break;
            case 'MS':
                value = 'Massive';
                break;
            case 'QR':
                value = 'Querys';
                break;
            case 'PR':
                value = 'Automatic';
                break;
            case 'MA':
                value = 'Manual';
                break;
        }
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
    searchform_detalleReport: function (rowIndex) {
        var me = this;
        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var gridReport3 = Ext.getCmp(prototype.id + '-CABgridReport3');
        var gridReport4 = Ext.getCmp(prototype.id + '-CABgridReport4');
        var btnback2 = Ext.getCmp(prototype.id + '-btn-back2');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var excel2 = Ext.getCmp(prototype.id + '-btn-excel2');
        var CABgridReport5 = Ext.getCmp(prototype.id + '-CABgridReport5');
        var CABgridReport7 = Ext.getCmp(prototype.id + '-CABgridReport7');
        var gridType = Ext.getCmp(prototype.id + '-Type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var cmbDateFromMonth = win.getMonthAbbreviationMes(cmbDateFromMonth);
        var cmbDateToMonth = win.getMonthAbbreviationMes(cmbDateToMonth);
        var excel4= Ext.getCmp(prototype.id + '-btn-excel4'); 
        gridReport3.hide();
        CABgridReport5.hide();
        CABgridReport7.hide();

        gridReport4.show();
        pagginator.show();
        excel2.show();
        btnback2.show();
        gridReport3.hide();
        excel4.hide();
        btnback.hide();
        var grid = '';
        if (gridType === '1') {
            grid = Ext.getCmp(prototype.id + '-gridReport3');
        }
        if (gridType === '2') {
            grid = Ext.getCmp(prototype.id + '-gridReportReason');
        }
        if (gridType === '3') {
            grid = Ext.getCmp(prototype.id + '-gridReportIata');
        }


        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;

        if (gridType === '3') {
            me.beanreport.VP_IATA = rec.data.A2548IATA;
        } else {
            me.beanreport.VP_IATA = "";
        }
        if (Ext.getCmp(prototype.id + '-search-type').getValue() === '1') {
            // me.beandetail.VP_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
            me.beanreport.VP_DATEFROM = data.A2548FREGI.substr(0, 4) + "" + win.getMonthAbbreviation(data.A2548FREGI.substr(4, 3)) + '01';
            me.beanreport.VP_DATETO = data.A2548FREGI.substr(0, 4) + "" + win.getMonthAbbreviation(data.A2548FREGI.substr(4, 3)) + '31';
        } else {
            if (gridType !== '3') {
                me.beanreport.VP_IATA = me.vl_agencia;
            }

            me.beanreport.VP_DATEFROM = txtFilterDateFrom + '' + win.getMonthAbbreviation(cmbDateFromMonth) + '01';
            me.beanreport.VP_DATETO = txtFilterDateTo + '' + win.getMonthAbbreviation(cmbDateToMonth) + '31';
        }

        me.beanreport.VP_FLAG = rec.data.A2548STAT;




        me.beanreport.VP_OPTION = gridType;
        Ext.getCmp(prototype.id + '-gridAdmreport').getStore().removeAll();
        Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchReportADM',
            method: 'POST',
            timeout: '300000',
            params: {
                beanString: JSON.stringify(me.beanreport)
            },
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.length !== 0) {
                    Ext.getCmp(prototype.id + '-gridAdmreport').getStore().loadData(res.data);
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(res.total);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                    Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(0);
                }


            }
        });


    },
    imgExcel_clickHandler: function (obj, e) {
        var me = this;
        if (me.beanreport.VP_DATEFROM === '') {
            global.Msg({msg: "PRAXIS: Debe de exitir algun registro disponible para exportar", icon: 2, fn: function () {
                }});
        }
        me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanreport)));
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onBackClick2: function (obj, e) {
        var me = this;
        var btnback = Ext.getCmp(prototype.id + '-btn-back');
        var gridReport3 = Ext.getCmp(prototype.id + '-CABgridReport3');
        var gridReport4 = Ext.getCmp(prototype.id + '-CABgridReport4');
        var btnback2 = Ext.getCmp(prototype.id + '-btn-back2');
        var pagginator = Ext.getCmp(prototype.id + '-pagginator-legend');
        var excel2 = Ext.getCmp(prototype.id + '-btn-excel2');
        var CABgridReport5 = Ext.getCmp(prototype.id + '-CABgridReport5');
        var gridType = Ext.getCmp(prototype.id + '-Type').getValue();
        var CABgridReport7 = Ext.getCmp(prototype.id + '-CABgridReport7');
        var excel4= Ext.getCmp(prototype.id + '-btn-excel4'); 
        gridReport4.hide();
        btnback2.hide();
        btnback.show();
        pagginator.hide();
        excel4.show();
        excel2.hide();
        if (gridType === '1') {
            gridReport3.show();
            CABgridReport5.hide();
            CABgridReport7.hide();
        }
        if (gridType === '2') {
            CABgridReport5.show();
            gridReport3.hide();
            CABgridReport7.hide();
        }
        if (gridType === '3') {
            CABgridReport7.show();
            gridReport3.hide();
            CABgridReport5.hide();
        }
    },
    OnAmountInteger: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },

    onCreateChartReal: function (Objtemp) {
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var cmbDateFromMonth = win.getMonthAbbreviationMes(cmbDateFromMonth);
        var cmbDateToMonth = win.getMonthAbbreviationMes(cmbDateToMonth);

        Ext.getCmp(prototype.id + '-chart1').removeAll();
        //Ext.getCmp(prototype.id + '-chart2').removeAll();
        Ext.getCmp(prototype.id + '-chart3').removeAll();
        Ext.getCmp(prototype.id + '-chart4').removeAll();
        Ext.getCmp(prototype.id + '-chart5').removeAll();
        //Ext.getCmp(prototype.id + '-chart6').removeAll();
        Ext.getCmp(prototype.id + '-chart7').removeAll();
        Ext.getCmp(prototype.id + '-chart8').removeAll();
        //Ext.getCmp(prototype.id + '-chart9').removeAll();
        //Ext.getCmp(prototype.id + '-chart10').removeAll();
        //Ext.getCmp(prototype.id + '-chart11').removeAll();
        // Ext.getCmp(prototype.id + '-chart12').removeAll();
        var panel1 = Ext.getCmp(prototype.id + '-chart1');
        //var panel2 = Ext.getCmp(prototype.id + '-chart2');
        var panel3 = Ext.getCmp(prototype.id + '-chart3');
        var panel4 = Ext.getCmp(prototype.id + '-chart4');
        var panel5 = Ext.getCmp(prototype.id + '-chart5');
        //var panel6 = Ext.getCmp(prototype.id + '-chart6');//NO ESTA HECHO
        var panel7 = Ext.getCmp(prototype.id + '-chart7');
        var panel8 = Ext.getCmp(prototype.id + '-chart8');
        // var panel9 = Ext.getCmp(prototype.id + '-chart9');
        //var panel10 = Ext.getCmp(prototype.id + '-chart10');
        // var panel11 = Ext.getCmp(prototype.id + '-chart11');
        // var panel12 = Ext.getCmp(prototype.id + '-chart12');

        var arraySearchMonth = [];
        var arrayDataMonth = [];
        var arrayDataGraMonth = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTBSP: Objtemp[i].CANTABSP, CANTASR: Objtemp[i].CANTASR, CANTARC: Objtemp[i].CANTARC}]

                });
            } else {
                arrayDataMonth[arraySearchMonth.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTBSP: Objtemp[i].CANTBSP, CANTASR: Objtemp[i].CANTASR, CANTARC: Objtemp[i].CANTARC});
            }
        }
        var vl_CANTBSP = 0;
        var vl_CANTASR = 0;
        var vl_CANTARC = 0;
        for (var i = 0; i < arrayDataMonth.length; ++i) {
            vl_CANTBSP = 0;
            vl_CANTASR = 0;
            vl_CANTARC = 0;
            for (var vi = 0; vi < arrayDataMonth[i].children.length; ++vi) {
                vl_CANTBSP += parseFloat(arrayDataMonth[i].children[vi].CANTBSP);
                vl_CANTASR += parseFloat(arrayDataMonth[i].children[vi].CANTASR);
                vl_CANTARC += parseFloat(arrayDataMonth[i].children[vi].CANTARC);
            }
            arrayDataGraMonth.push({anio: arrayDataMonth[i].A1672FPROC, CANTBSP: vl_CANTBSP, CANTASR: vl_CANTASR, CANTARC: vl_CANTARC});

        }
        var storeMonth = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTBSP', 'CANTASR', 'CANTARC'],
            data: arrayDataGraMonth

        });

        var chart01 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    captions: {
                        title: {
                            text: 'Ticket approved by processing date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    //theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTBSP', 'CANTASR', 'CANTARC'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                // text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['BSP', 'ASR', 'ARC'],
                        xField: 'anio',
                        yField: ['CANTBSP', 'CANTASR', 'CANTARC'],

                        label: {
                            field: ['CANTBSP', 'CANTASR', 'CANTARC'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render'
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel1.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Ticket approved by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                        });
                    }
                }
            ]
        });
        panel1.add(chart01);

        //grafico para comparar Ticket Approved and Billing by Processind Date
        /*  var arraySearchMonth2 = [];
         var arrayDataMonth2 = [];
         var arrayDataGraMonth2 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth2.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
         arraySearchMonth2.push(String(Objtemp[i].A1672FPROC));
         arrayDataMonth2.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC),
         children: [{CANTADMACEP: Objtemp[i].CANTBSP, CANTBILLED: Objtemp[i].CANTBILLED, CANTASR: Objtemp[i].CANTASR}]
         
         });
         } else {
         arrayDataMonth2[arraySearchMonth2.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADMACEP: Objtemp[i].CANTBSP, CANTBILLED: Objtemp[i].CANTBILLED, CANTASR: Objtemp[i].CANTASR});
         }
         }
         var vl_CANTADMACEP = 0;
         var vl_CANTBILLED = 0;
         for (var i = 0; i < arrayDataMonth2.length; ++i) {
         vl_CANTADMACEP = 0;
         vl_CANTBILLED = 0;
         for (var vi = 0; vi < arrayDataMonth2[i].children.length; ++vi) {
         vl_CANTADMACEP += (parseFloat(arrayDataMonth2[i].children[vi].CANTADMACEP) + parseFloat(arrayDataMonth2[i].children[vi].CANTASR));
         vl_CANTBILLED += parseFloat(arrayDataMonth2[i].children[vi].CANTBILLED);
         }
         arrayDataGraMonth2.push({anio: arrayDataMonth2[i].A1672FPROC, CANTADMACEP: vl_CANTADMACEP, CANTBILLED: vl_CANTBILLED});
         
         }
         var storeMonth2 = Ext.create('Ext.data.Store', {
         fields: ['anio', 'CANTADMACEP', 'CANTBILLED'],
         data: arrayDataGraMonth2
         
         });
         
         var chart02 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe2',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 350,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         animate: true,
         captions: {
         title: {
         text: 'Ticket approved and billing by processind date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         },
         subtitle: {
         alignTo: 'chart'
         }
         },
         //theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth2,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         fields: ['CANTADMACEP', 'CANTBILLED'],
         grid: true
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'anio',
         title: {
         //text: 'Months',
         translationX: -30
         },
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['Approved', 'Billing'],
         xField: 'anio',
         yField: ['CANTADMACEP', 'CANTBILLED'],
         
         label: {
         field: ['CANTADMACEP', 'CANTBILLED'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRenderm'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onTooltip3Render'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel2.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Ticket approved and billing by processind date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         panel2.add(chart02);*/
        //Status de Tickets Accepted by Processing Date
        //'Grouping', 'Unregistered', 'Justified', 'Authorized', 'Disabled', 'Reaudited'
        //CANTADMPENGROUP,CANTADMSINCLIE,CANTADMJUSTI,CANTADMAUTORI,CANTADMIATADISA,CANTADMREUDITE
        var arraySearchMonth3 = [];
        var arrayDataMonth3 = [];
        var arrayDataGraMonth3 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth3.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth3.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth3.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTADMPENGROUP: Objtemp[i].CANTADMPENGROUP, CANTADMSINCLIE: Objtemp[i].CANTADMSINCLIE, CANTADMJUSTI: Objtemp[i].CANTADMJUSTI, CANTADMAUTORI: Objtemp[i].CANTADMAUTORI, CANTADMIATADISA: Objtemp[i].CANTADMIATADISA, CANTADMREUDITE: Objtemp[i].CANTADMREUDITE}]

                });
            } else {
                arrayDataMonth3[arraySearchMonth3.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADMPENGROUP: Objtemp[i].CANTADMPENGROUP, CANTADMSINCLIE: Objtemp[i].CANTADMSINCLIE, CANTADMJUSTI: Objtemp[i].CANTADMJUSTI, CANTADMAUTORI: Objtemp[i].CANTADMAUTORI, CANTADMIATADISA: Objtemp[i].CANTADMIATADISA, CANTADMREUDITE: Objtemp[i].CANTADMREUDITE});
            }
        }
        var vl_CANTADMPENGROUP = 0;
        var vl_CANTADMSINCLIE = 0;
        var vl_CANTADMJUSTI = 0;
        var vl_CANTADMAUTORI = 0;
        var vl_CANTADMIATADISA = 0;
        var vl_CANTADMREUDITE = 0;
        for (var i = 0; i < arrayDataMonth3.length; ++i) {
            vl_CANTADMPENGROUP = 0;
            vl_CANTADMSINCLIE = 0;
            vl_CANTADMJUSTI = 0;
            vl_CANTADMAUTORI = 0;
            vl_CANTADMIATADISA = 0;
            vl_CANTADMREUDITE = 0;
            for (var vi = 0; vi < arrayDataMonth3[i].children.length; ++vi) {
                vl_CANTADMPENGROUP += parseFloat(arrayDataMonth3[i].children[vi].CANTADMPENGROUP);
                vl_CANTADMSINCLIE += parseFloat(arrayDataMonth3[i].children[vi].CANTADMSINCLIE);
                vl_CANTADMJUSTI += parseFloat(arrayDataMonth3[i].children[vi].CANTADMJUSTI);
                vl_CANTADMAUTORI += parseFloat(arrayDataMonth3[i].children[vi].CANTADMAUTORI);
                vl_CANTADMIATADISA += parseFloat(arrayDataMonth3[i].children[vi].CANTADMIATADISA);
                vl_CANTADMREUDITE += parseFloat(arrayDataMonth3[i].children[vi].CANTADMREUDITE);
            }
            arrayDataGraMonth3.push({anio: arrayDataMonth3[i].A1672FPROC, CANTADMPENGROUP: vl_CANTADMPENGROUP, CANTADMSINCLIE: vl_CANTADMSINCLIE, CANTADMJUSTI: vl_CANTADMJUSTI, CANTADMAUTORI: vl_CANTADMAUTORI, CANTADMIATADISA: vl_CANTADMIATADISA, CANTADMREUDITE: vl_CANTADMREUDITE});

        }
        var storeMonth3 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTADMPENGROUP', 'CANTADMSINCLIE', 'CANTADMJUSTI', 'CANTADMAUTORI', 'CANTADMIATADISA', 'CANTADMREUDITE'],
            data: arrayDataGraMonth3

        });

        var chart03 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe3',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    animate: true,
                    captions: {
                        title: {
                            text: 'Status de tickets accepted by processing date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth3,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTADMPENGROUP', 'CANTADMSINCLIE', 'CANTADMJUSTI', 'CANTADMAUTORI', 'CANTADMIATADISA', 'CANTADMREUDITE'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                //text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['Grouping', 'Unregistered', 'Justified', 'Authorized', 'Disabled', 'Reaudited'],
                        xField: 'anio',
                        yField: ['CANTADMPENGROUP', 'CANTADMSINCLIE', 'CANTADMJUSTI', 'CANTADMAUTORI', 'CANTADMIATADISA', 'CANTADMREUDITE'],

                        label: {
                            field: ['CANTADMPENGROUP', 'CANTADMSINCLIE', 'CANTADMJUSTI', 'CANTADMAUTORI', 'CANTADMIATADISA', 'CANTADMREUDITE'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render'
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel3.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Status de tickets accepted by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
                        });
                    }
                }
            ]
        });
        panel3.add(chart03);

        // 4 Tickes suggested and accepted by processing date
        /* var arraySearchMonth4 = [];
         var arrayDataMonth4 = [];
         var arrayDataGraMonth4 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth4.indexOf(String(Objtemp[i].A1672FPROC).substr(0, 4) && String(Objtemp[i].A1672FPROC).substr(4, 3)) < 0) {
         arraySearchMonth4.push(String(Objtemp[i].A1672FPROC).substr(4, 3));
         arrayDataMonth4.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC).substr(4, 3),
         children: [
         {CANTADMACEP: Objtemp[i].CANTADMACEP, CANTADM: Objtemp[i].CANTADM, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)}
         ]
         
         });
         } else {
         arrayDataMonth4[arraySearchMonth4.indexOf(String(Objtemp[i].A1672FPROC).substr(4, 3))].children.push({CANTADMACEP: Objtemp[i].CANTADMACEP, CANTADM: Objtemp[i].CANTADM, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)});
         }
         }
         var vl_CANTADMACEP2018 = 0;
         var vl_CANTADMACEP2019 = 0;
         var vl_CANTADMACEP2020 = 0;
         var vl_CANTADMACEP2021 = 0;
         var vl_CANTADM2018 = 0;
         var vl_CANTADM2019 = 0;
         var vl_CANTADM2020 = 0;
         var vl_CANTADM2021 = 0;
         for (var i = 0; i < arrayDataMonth4.length; ++i) {
         vl_CANTADMACEP2018 = 0;
         vl_CANTADMACEP2019 = 0;
         vl_CANTADMACEP2020 = 0;
         vl_CANTADMACEP2021 = 0;
         for (var vi = 0; vi < arrayDataMonth4[i].children.length; ++vi) {
         if (arrayDataMonth4[i].children[vi].A3389ANIO === '2018') {
         vl_CANTADMACEP2018 += parseFloat(arrayDataMonth4[i].children[vi].CANTADMACEP);
         vl_CANTADM2018 += parseFloat(arrayDataMonth4[i].children[vi].CANTADM);
         }
         if (arrayDataMonth4[i].children[vi].A3389ANIO === '2019') {
         vl_CANTADMACEP2019 += parseFloat(arrayDataMonth4[i].children[vi].CANTADMACEP);
         vl_CANTADM2019 += parseFloat(arrayDataMonth4[i].children[vi].CANTADM);
         }
         if (arrayDataMonth4[i].children[vi].A3389ANIO === '2020') {
         vl_CANTADMACEP2020 += parseFloat(arrayDataMonth4[i].children[vi].CANTADMACEP);
         vl_CANTADM2020 += parseFloat(arrayDataMonth4[i].children[vi].CANTADM);
         }
         if (arrayDataMonth4[i].children[vi].A3389ANIO === '2021') {
         vl_CANTADMACEP2021 += parseFloat(arrayDataMonth4[i].children[vi].CANTADMACEP);
         vl_CANTADM2021 += parseFloat(arrayDataMonth4[i].children[vi].CANTADM);
         }
         }
         arrayDataGraMonth4.push({month: arrayDataMonth4[i].A1672FPROC, CANTADMACEP2018: vl_CANTADMACEP2018, CANTADMACEP2019: vl_CANTADMACEP2019, CANTADMACEP2020: vl_CANTADMACEP2020, CANTADMACEP2021: vl_CANTADMACEP2021, CANTADM2018: vl_CANTADM2018, CANTADM2019: vl_CANTADM2019, CANTADM2020: vl_CANTADM2020, CANTADM2021: vl_CANTADM2021});
         
         }
         var storeMonth10 = Ext.create('Ext.data.Store', {
         fields: ['month', 'CANTADMACEP2018', 'CANTADMACEP2019', 'CANTADMACEP2020', 'CANTADMACEP2021', 'CANTADM2018', 'CANTADM2019', 'CANTADM2020', 'CANTADM2021'],
         data: arrayDataGraMonth4
         
         });
         
         var chart04 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe4',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 350,
         captions: {
         title: {
         text: 'Tickes suggested and accepted by processing date ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: arrayDataGraMonth4,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [{
         type: 'numeric3d',
         position: 'left',
         fields: ['CANTADMACEP2018', 'CANTADMACEP2019', 'CANTADMACEP2020', 'CANTADMACEP2021', 'CANTADM2018', 'CANTADM2019', 'CANTADM2020', 'CANTADM2021'],
         grid: true,
         renderer: 'onSeriesLabelRenderm'
         }, {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         title: {
         translationX: -30
         },
         grid: true
         }],
         series: {
         type: 'bar3d',
         stacked: false,
         
         
         title: ['Accepted AM 18','Accepted AM 19','Accepted AM 20', 'Accepted AM 21','Suggested BPO 18', 'Suggested BPO 19','Suggested BPO 20', 'Suggested BPO 21'],
         xField: 'month',
         yField: ['CANTADMACEP2018', 'CANTADMACEP2019', 'CANTADMACEP2020', 'CANTADMACEP2021', 'CANTADM2018', 'CANTADM2019', 'CANTADM2020', 'CANTADM2021'],
         label: {
         field: ['CANTADMACEP2018', 'CANTADMACEP2019', 'CANTADMACEP2020', 'CANTADMACEP2021', 'CANTADM2018', 'CANTADM2019', 'CANTADM2020', 'CANTADM2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel4.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Tickes suggested and accepted by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });*/

        var arraySearchMonth4 = [];
        var arrayDataMonth4 = [];
        var arrayDataGraMonth4 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth4.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth4.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth4.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTADMACEP: Objtemp[i].CANTADMACEP, CANTADM: Objtemp[i].CANTADM}]

                });
            } else {
                arrayDataMonth4[arraySearchMonth4.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADMACEP: Objtemp[i].CANTADMACEP, CANTADM: Objtemp[i].CANTADM});
            }
        }
        var vl_CCANTADMACEP = 0;
        var vl_CANTADM = 0;
        for (var i = 0; i < arrayDataMonth4.length; ++i) {
            vl_CCANTADMACEP = 0;
            vl_CANTADM = 0;
            for (var vi = 0; vi < arrayDataMonth4[i].children.length; ++vi) {
                vl_CCANTADMACEP += parseFloat(arrayDataMonth4[i].children[vi].CANTADMACEP);
                vl_CANTADM += parseFloat(arrayDataMonth4[i].children[vi].CANTADM);
            }
            arrayDataGraMonth4.push({anio: arrayDataMonth4[i].A1672FPROC, CANTADMACEP: vl_CCANTADMACEP, CANTADM: vl_CANTADM});

        }
        var storeMonth4 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTADMACEP', 'CANTADM'],
            data: arrayDataGraMonth4

        });
        var chart04 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe4',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    animate: true,
                    captions: {
                        title: {
                            text: 'Tickes suggested and accepted by processing date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    //theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth4,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTADM', 'CANTADMACEP'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                //text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['Suggested BPO', 'Accepted AM'],
                        xField: 'anio',
                        yField: ['CANTADM', 'CANTADMACEP'],

                        label: {
                            field: ['CANTADM', 'CANTADMACEP'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render'
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel4.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Tickes suggested and accepted by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
                        });
                    }
                }
            ]
        });

        panel4.add(chart04);

        // 4 Status Ticket by  by processing date

        var arraySearchMonth5 = [];
        var arrayDataMonth5 = [];
        var arrayDataGraMonth5 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth5.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth5.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth5.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTADMREV: Objtemp[i].CANTADMREV, CANTADMRECH: Objtemp[i].CANTADMRECH, CANTADMENV: Objtemp[i].CANTADMENV}]

                });
            } else {
                arrayDataMonth5[arraySearchMonth5.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADMREV: Objtemp[i].CANTADMREV, CANTADMRECH: Objtemp[i].CANTADMRECH, CANTADMENV: Objtemp[i].CANTADMENV});
            }
        }
        var vl_CANTADMREV = 0;
        var vl_CANTADMRECH = 0;
        var vl_CANTADMENV = 0;
        for (var i = 0; i < arrayDataMonth5.length; ++i) {
            vl_CANTADMREV = 0;
            vl_CANTADMRECH = 0;
            vl_CANTADMENV = 0;
            for (var vi = 0; vi < arrayDataMonth5[i].children.length; ++vi) {
                vl_CANTADMREV += parseFloat(arrayDataMonth5[i].children[vi].CANTADMREV);
                vl_CANTADMRECH += parseFloat(arrayDataMonth5[i].children[vi].CANTADMRECH);
                vl_CANTADMENV += parseFloat(arrayDataMonth5[i].children[vi].CANTADMENV);
            }
            arrayDataGraMonth5.push({anio: arrayDataMonth5[i].A1672FPROC, CANTADMREV: vl_CANTADMREV, CANTADMRECH: vl_CANTADMRECH, CANTADMENV: vl_CANTADMENV});

        }
        var storeMonth5 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTADMREV', 'CANTADMRECH', 'CANTADMENV'],
            data: arrayDataGraMonth5

        });

        var chart05 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe5',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    animate: true,
                    captions: {
                        title: {
                            text: 'Status ticket by processing date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    //theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth5,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTADMREV', 'CANTADMRECH', 'CANTADMENV'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                //text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: [{
                            type: 'bar3d',
                            stacked: false,
                            title: ['Pending AM', 'Rejected AM', 'Special Cases'],
                            xField: 'anio',
                            yField: ['CANTADMREV', 'CANTADMRECH', 'CANTADMENV'],

                            label: {
                                field: ['CANTADMREV', 'CANTADMRECH', 'CANTADMENV'],
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRenderm'
                            },
                            highlight: true,
                            style: {
                                inGroupGapWidth: -7
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltip3Render'
                            }
                        }
                    ]

                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel5.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Status ticket by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
                        });
                    }
                }
            ]
        });
        panel5.add(chart05);
        //panel6
        /* var arraySearchMes = [];
         var arrayDataMes = [];
         var arrayDataMesGra = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMes.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
         arraySearchMes.push(String(Objtemp[i].A1672FPROC));
         arrayDataMes.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC),
         children: [
         {BILLEDUSD: Objtemp[i].BILLEDUSD, CANTADMACEP: Objtemp[i].CANTADMACEP, CANTBILLED: Objtemp[i].CANTBILLED}
         ]
         });
         } else {
         arrayDataMes[arraySearchMes.indexOf(String(Objtemp[i].A1672FPROC))].children.push({BILLEDUSD: Objtemp[i].BILLEDUSD, CANTADMACEP: Objtemp[i].CANTADMACEP, CANTBILLED: Objtemp[i].CANTBILLED});
         }
         }
         var vp_BILLEDUSD = 0;
         var vl_ACUMULADOPed = 0;
         var vl_CANTADMACEP = 0;
         //this.totalPoce = 0;
         for (var i = 0; i < arrayDataMes.length; ++i) {
         vp_BILLEDUSD = 0;
         for (var vi = 0; vi < arrayDataMes[i].children.length; ++vi) {
         vp_BILLEDUSD += parseFloat(arrayDataMes[i].children[vi].BILLEDUSD);
         vl_CANTADMACEP += (parseFloat(arrayDataMes[i].children[vi].CANTBILLED) / parseFloat(arrayDataMes[i].children[vi].CANTADMACEP));
         vl_ACUMULADOPed += vp_BILLEDUSD;
         }
         arrayDataMesGra.push({anio: arrayDataMes[i].A1672FPROC, BILLEDUSD: vp_BILLEDUSD, CANTADMACEP: vl_CANTADMACEP, ACUMULADOPed: vl_ACUMULADOPed});
         
         }
         var store06 = Ext.create('Ext.data.Store', {
         fields: ['anio', 'BILLEDUSD', 'ACUMULADOPed', 'CANTADMACEP'],
         data: arrayDataMesGra
         
         });
         var chart06 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosMeses',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 380,
         captions: {
         title: {
         text: 'Accumulated por TKT billing/accepted ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         },
         subtitle: {
         // text: 'Quarter-wise comparison',
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: store06,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [{
         type: 'numeric3d',
         position: 'left',
         fields: ['BILLEDUSD'],
         grid: true//,
         //title: 'Sales in USD',
         // renderer: 'onAxisLabelRender'
         }, {
         type: 'category3d',
         position: 'bottom',
         fields: 'anio',
         title: {
         translationX: -30
         },
         grid: true
         }],
         series: [{
         type: 'bar3d',
         stacked: false,
         // colors: ['blue','red','green','yellow','orange'],
         title: ['Billing AM USD'],
         xField: 'anio',
         yField: ['BILLEDUSD'],
         
         label: {
         field: ['BILLEDUSD'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRenderm_Porce'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         }, tooltip: {
         trackMouse: true,
         renderer: 'onTooltip3Render_Porce'
         }
         },
         {
         type: 'line',
         title: ['Accumulated Billing AM USD'],
         xField: 'anio',
         yField: ['ACUMULADOPed'],
         style: {
         lineWidth: 2,
         opacity: 0.80
         },
         marker: {
         type: 'cross',
         animation: {
         duration: 200
         }
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onLineSeriesTooltipRender2'
         }
         }
         ]
         
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel6.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Accumulated por TKT billing/accepted " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         panel6.add(chart06);
         */

        //graficos 7 Ticktets Accepted and Billing by Processing Date
        var arraySearchMonth7 = [];
        var arrayDataMonth7 = [];
        var arrayDataGraMonth7 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth7.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth7.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth7.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTADMACEP: Objtemp[i].CANTADMACEP, CANTBILLED: Objtemp[i].CANTBILLED}]

                });
            } else {
                arrayDataMonth7[arraySearchMonth7.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADMACEP: Objtemp[i].CANTADMACEP, CANTBILLED: Objtemp[i].CANTBILLED});
            }
        }
        var vl_CANTADMACEP = 0;
        var vl_CANTBILLED = 0;
        var vl_ACUMULADO = 0;
        for (var i = 0; i < arrayDataMonth7.length; ++i) {
            vl_CANTADMACEP = 0;
            vl_CANTBILLED = 0;
            for (var vi = 0; vi < arrayDataMonth7[i].children.length; ++vi) {
                vl_CANTADMACEP += parseFloat(arrayDataMonth7[i].children[vi].CANTADMACEP);
                vl_CANTBILLED += parseFloat(arrayDataMonth7[i].children[vi].CANTBILLED);
                vl_ACUMULADO += vl_CANTBILLED;
            }
            arrayDataGraMonth7.push({anio: arrayDataMonth7[i].A1672FPROC, CANTADMACEP: vl_CANTADMACEP, CANTBILLED: vl_CANTBILLED, ACUMULADO: vl_ACUMULADO});

        }
        var storeMonth7 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTADMACEP', 'CANTBILLED', 'ACUMULADO'],
            data: arrayDataGraMonth7

        });

        var chart07 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe7',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 360,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    animate: true,
                    captions: {
                        title: {
                            text: 'Ticktets accepted and billing by processing date ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth7,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTADMACEP', 'CANTBILLED'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                //text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: [{
                            type: 'bar3d',
                            stacked: false,
                            title: ['Acceptep AM', 'Billing AM'],
                            xField: 'anio',
                            yField: ['CANTADMACEP', 'CANTBILLED'],

                            label: {
                                field: ['CANTADMACEP', 'CANTBILLED'],
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRenderm'
                            },
                            highlight: true,
                            style: {
                                inGroupGapWidth: -7
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltip3Render'
                            }
                        },
                        {
                            type: 'line',
                            title: ['Accumulated Billing AM'],
                            xField: 'anio',
                            yField: ['ACUMULADO'],
                            style: {
                                lineWidth: 2,
                                opacity: 0.80
                            },
                            marker: {
                                type: 'cross',
                                animation: {
                                    duration: 200
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onLineSeriesTooltipRender'
                            }
                        }

                    ]

                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel7.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Ticktets accepted and billing by processing date " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
                        });
                    }
                }
            ]
        });
        panel7.add(chart07);
        //graficos 8 Ticktets Suggested and Accumulated  by Processing Date
        var arraySearchMonth8 = [];
        var arrayDataMonth8 = [];
        var arrayDataGraMonth8 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth8.indexOf(String(Objtemp[i].A1672FPROC)) < 0) {
                arraySearchMonth8.push(String(Objtemp[i].A1672FPROC));
                arrayDataMonth8.push({
                    A1672FPROC: String(Objtemp[i].A1672FPROC),
                    children: [{CANTADM: Objtemp[i].CANTADM, CANTBILLED: Objtemp[i].CANTBILLED}]

                });
            } else {
                arrayDataMonth8[arraySearchMonth8.indexOf(String(Objtemp[i].A1672FPROC))].children.push({CANTADM: Objtemp[i].CANTADM, CANTBILLED: Objtemp[i].CANTBILLED});
            }
        }
        var vl_CANTADM = 0;
        var vl_ACUMULADOPed = 0;
        var vl_CANTBILLED = 0;
        for (var i = 0; i < arrayDataMonth8.length; ++i) {
            vl_CANTADM = 0;
            vl_CANTBILLED = 0;
            for (var vi = 0; vi < arrayDataMonth8[i].children.length; ++vi) {
                vl_CANTADM += parseFloat(arrayDataMonth8[i].children[vi].CANTADM);
                vl_CANTBILLED += parseFloat(arrayDataMonth8[i].children[vi].CANTBILLED);
                vl_ACUMULADOPed += vl_CANTADM;
            }
            arrayDataGraMonth8.push({anio: arrayDataMonth8[i].A1672FPROC, CANTADM: vl_CANTADM, CANTBILLED: vl_CANTBILLED, ACUMULADO: vl_ACUMULADOPed});

        }
        var storeMonth8 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTADM', 'CANTBILLED', 'ACUMULADO'],
            data: arrayDataGraMonth8

        });

        var chart08 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe8',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 360,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    animate: true,
                    captions: {
                        title: {
                            text: 'Suggested BPO - billing AM - accum suggested BPO ' + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth8,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            fields: ['CANTADM', 'CANTBILLED'],
                            position: 'left',
                            majorTickSteps: 10,
                            reconcileRange: true,
                            grid: true,
                            minimum: 0
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            label: {
                                rotate: {
                                    degrees: -45
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'bar3d',
                            stacked: false,
                            title: ['Suggested BPO', 'BILLING AM'],
                            xField: 'anio',
                            yField: ['CANTADM', 'CANTBILLED'],

                            label: {
                                field: ['CANTADM', 'CANTBILLED'],
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRenderm'
                            },
                            highlight: {
                                fillStyle: 'rgba(204, 230, 73, 1.0)',
                                strokeStyle: 'black'
                            },
                            style: {
                                inGroupGapWidth: -7
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltip3Render'
                            }
                        },
                        {
                            type: 'line',
                            title: ['Accum. Suggested BPO'],
                            xField: 'anio',
                            yField: ['ACUMULADO'],
                            style: {
                                lineWidth: 2,
                                opacity: 0.80
                            },
                            marker: {
                                type: 'cross',
                                animation: {
                                    duration: 200
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onLineSeriesTooltipRender'
                            }
                        }
                    ]

                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel8.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Suggested BPO - billing AM - accum suggested BPO " + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
                        });
                    }
                }
            ]
        });
        panel8.add(chart08);
        //GRAFICO 9 Promedio Billing USD anual por mes.
        /*
         var arraySearchMonth9 = [];
         var arrayDataMonth9 = [];
         var arrayDataGraMonth9 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth9.indexOf(String(Objtemp[i].A1672FPROC).substr(0, 4) && String(Objtemp[i].A1672FPROC).substr(4, 3)) < 0) {
         arraySearchMonth9.push(String(Objtemp[i].A1672FPROC).substr(4, 3));
         arrayDataMonth9.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC).substr(4, 3),
         children: [
         {BILLEDUSD: Objtemp[i].BILLEDUSD, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)}
         ]
         
         });
         } else {
         arrayDataMonth9[arraySearchMonth9.indexOf(String(Objtemp[i].A1672FPROC).substr(4, 3))].children.push({BILLEDUSD: Objtemp[i].BILLEDUSD, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)});
         }
         }
         var vl_BILLEDUSD2018 = 0;
         var vl_BILLEDUSD2019 = 0;
         var vl_BILLEDUSD2020 = 0;
         var vl_BILLEDUSD2021 = 0;
         
         var vl_BILLEDUSD2018_2 = 0;
         var vl_BILLEDUSD2019_2 = 0;
         var vl_BILLEDUSD2020_2 = 0;
         var vl_BILLEDUSD2021_2 = 0;
         for (var i = 0; i < arrayDataMonth9.length; ++i) {
         vl_BILLEDUSD2018_2 = 0;
         vl_BILLEDUSD2019_2 = 0;
         vl_BILLEDUSD2020_2 = 0;
         vl_BILLEDUSD2021_2 = 0;
         for (var vi = 0; vi < arrayDataMonth9[i].children.length; ++vi) {
         if (arrayDataMonth9[i].children[vi].A3389ANIO === '2018') {
         vl_BILLEDUSD2018_2 += parseFloat(arrayDataMonth9[i].children[vi].BILLEDUSD);
         vl_BILLEDUSD2018 = (vl_BILLEDUSD2018 + 1);
         }
         if (arrayDataMonth9[i].children[vi].A3389ANIO === '2019') {
         vl_BILLEDUSD2019_2 += parseFloat(arrayDataMonth9[i].children[vi].BILLEDUSD);
         vl_BILLEDUSD2019 = (vl_BILLEDUSD2019 + 1);
         }
         if (arrayDataMonth9[i].children[vi].A3389ANIO === '2020') {
         vl_BILLEDUSD2020_2 += parseFloat(arrayDataMonth9[i].children[vi].BILLEDUSD);
         vl_BILLEDUSD2020 = (vl_BILLEDUSD2020 + 1);
         }
         if (arrayDataMonth9[i].children[vi].A3389ANIO === '2021') {
         vl_BILLEDUSD2021_2 += parseFloat(arrayDataMonth9[i].children[vi].BILLEDUSD);
         vl_BILLEDUSD2021 = (vl_BILLEDUSD2021 + 1);
         }
         }
         arrayDataGraMonth9.push({month: arrayDataMonth9[i].A1672FPROC, CANTUSD2018: vl_BILLEDUSD2018_2, CANTUSD2019: vl_BILLEDUSD2019_2, CANTUSD2020: vl_BILLEDUSD2020_2, CANTUSD2021: vl_BILLEDUSD2021_2});
         
         }
         var storeMonth9 = Ext.create('Ext.data.Store', {
         fields: ['month', 'CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         data: arrayDataGraMonth9
         
         });
         console.log(vl_BILLEDUSD2018 + ',' + vl_BILLEDUSD2019 + ',' + vl_BILLEDUSD2020 + ',' + vl_BILLEDUSD2021);
         var chart09 = null;
         if (vl_BILLEDUSD2018 !== 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 !== 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_1',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTUSD2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTUSD2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd Current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 !== 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_2',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTUSD2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 !== 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 === 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_3',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2018', 'CANTUSD2019'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTUSD2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 !== 0 && vl_BILLEDUSD2019 === 0 && vl_BILLEDUSD2020 === 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_4',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2018'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTUSD2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 === 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_5',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2019'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 === 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_6',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd burrent year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 === 0 && vl_BILLEDUSD2020 === 0 && vl_BILLEDUSD2021 !== 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_7',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTUSD2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 === 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 !== 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_8',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2020', 'CANTUSD2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTUSD2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 !== 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_10',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTUSD2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (vl_BILLEDUSD2018 === 0 && vl_BILLEDUSD2019 !== 0 && vl_BILLEDUSD2020 !== 0 && vl_BILLEDUSD2021 === 0) {
         chart09 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe9_12',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth9,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing usd current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTUSD2019', 'CANTUSD2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTUSD2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTUSD2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel9.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing usd current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         panel9.add(chart09);*/
        //graficos 10 Ticktets Suggested and Accumulated  by Processing Date
        /*var arraySearchMonth10 = [];
         var arrayDataMonth10 = [];
         var arrayDataGraMonth10 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth10.indexOf(String(Objtemp[i].A1672FPROC).substr(0, 4) && String(Objtemp[i].A1672FPROC).substr(4, 3)) < 0) {
         arraySearchMonth10.push(String(Objtemp[i].A1672FPROC).substr(4, 3));
         arrayDataMonth10.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC).substr(4, 3),
         children: [
         {BILLEDUSD: Objtemp[i].BILLEDUSD, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)}
         ]
         
         });
         } else {
         arrayDataMonth10[arraySearchMonth10.indexOf(String(Objtemp[i].A1672FPROC).substr(4, 3))].children.push({BILLEDUSD: Objtemp[i].BILLEDUSD, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)});
         }
         }
         
         var vl_BILLEDUSD2018 = 0;
         var vl_BILLEDUSD2019 = 0;
         var vl_BILLEDUSD2020 = 0;
         var vl_BILLEDUSD2021 = 0;
         this.total2018 = 0;
         this.total2019 = 0;
         this.total2020 = 0;
         this.total2021 = 0;
         var VL_acum2018 = 0;
         var VL_count2018 = 0;
         var VL_acum2019 = 0;
         var VL_count2019 = 0;
         var VL_acum2020 = 0;
         var VL_count2020 = 0;
         var VL_acum2021 = 0;
         var VL_count2021 = 0;
         for (var i = 0; i < arrayDataMonth10.length; ++i) {
         vl_BILLEDUSD2018 = 0;
         vl_BILLEDUSD2019 = 0;
         vl_BILLEDUSD2020 = 0;
         vl_BILLEDUSD2021 = 0;
         for (var vi = 0; vi < arrayDataMonth10[i].children.length; ++vi) {
         if (arrayDataMonth10[i].children[vi].A3389ANIO === '2018') {
         vl_BILLEDUSD2018 += parseFloat(arrayDataMonth10[i].children[vi].BILLEDUSD);
         VL_acum2018 += vl_BILLEDUSD2018;
         VL_count2018 = (VL_count2018 + 1);
         }
         if (arrayDataMonth10[i].children[vi].A3389ANIO === '2019') {
         vl_BILLEDUSD2019 += parseFloat(arrayDataMonth10[i].children[vi].BILLEDUSD);
         VL_acum2019 += vl_BILLEDUSD2019;
         VL_count2019 = (VL_count2019 + 1);
         }
         if (arrayDataMonth10[i].children[vi].A3389ANIO === '2020') {
         vl_BILLEDUSD2020 += parseFloat(arrayDataMonth10[i].children[vi].BILLEDUSD);
         VL_acum2020 += vl_BILLEDUSD2020;
         VL_count2020 = (VL_count2020 + 1);
         }
         if (arrayDataMonth10[i].children[vi].A3389ANIO === '2021') {
         vl_BILLEDUSD2021 += parseFloat(arrayDataMonth10[i].children[vi].BILLEDUSD);
         VL_acum2021 += vl_BILLEDUSD2021;
         VL_count2021 = (VL_count2021 + 1);
         }
         }
         arrayDataGraMonth10.push({month: arrayDataMonth10[i].A1672FPROC, CANTUSD2018: vl_BILLEDUSD2018, CANTUSD2019: vl_BILLEDUSD2019, CANTUSD2020: vl_BILLEDUSD2020, CANTUSD2021: vl_BILLEDUSD2021});
         
         }
         var storeMonth10 = Ext.create('Ext.data.Store', {
         fields: ['month', 'CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         data: arrayDataGraMonth10
         
         });
         if (VL_count2018 !== 0) {
         this.total2018 = (VL_acum2018 / VL_count2018);
         }
         if (VL_count2019 !== 0) {
         this.total2019 = (VL_acum2019 / VL_count2019);
         }
         if (VL_count2020 !== 0) {
         this.total2020 = (VL_acum2020 / VL_count2020);
         }
         if (VL_count2021 !== 0) {
         this.total2021 = (VL_acum2021 / VL_count2021);
         }
         var chart010 = null;
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_1',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.total2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.total2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.total2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.total2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019', '2020', '2021'],
         xField: 'month',
         yField: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         label: {
         field: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_2',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.total2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.total2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.total2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019', '2020'],
         xField: 'month',
         yField: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020'],
         label: {
         field: ['CANTUSD2018', 'CANTUSD2019', 'CANTUSD2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_3',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.total2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.total2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.total2019, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019'],
         xField: 'month',
         yField: ['CANTUSD2018', 'CANTUSD2019'],
         label: {
         field: ['CANTUSD2018', 'CANTUSD2019'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         
         }
         if (VL_count2018 !== 0 && VL_count2019 === 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_4',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.total2018, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018'],
         xField: 'month',
         yField: ['CANTUSD2018'],
         label: {
         field: ['CANTUSD2018'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_6',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019'],
         xField: 'month',
         yField: ['CANTUSD2019'],
         label: {
         field: ['CANTUSD2019'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_7',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2020'],
         xField: 'month',
         yField: ['CANTUSD2020'],
         label: {
         field: ['CANTUSD2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 === 0 && VL_count2021 !== 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_8',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         
         {
         value: this.total2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.total2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2021'],
         xField: 'month',
         yField: ['CANTUSD2021'],
         label: {
         field: ['CANTUSD2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_9',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.total2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2020', '2021'],
         xField: 'month',
         yField: ['CANTUSD2020', 'CANTUSD2021'],
         label: {
         field: ['CANTUSD2020', 'CANTUSD2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_10',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.total2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.total2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.total2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019', '2020', '2021'],
         xField: 'month',
         yField: ['CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         label: {
         field: ['CANTUSD2019', 'CANTUSD2020', 'CANTUSD2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart010 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe10_11',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: 'Average annual usd billing per month ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth10,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.total2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.total2019, '0,000'),
         fontSize: 14,
         labelStyle: 'font-weight:bold;',
         style: {
         background: '#6699FF',
         color: 'black',
         textAlign: 'center'
         }
         }
         }
         },
         {
         value: this.total2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.total2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019', '2020'],
         xField: 'month',
         yField: ['CANTUSD2019', 'CANTUSD2020'],
         label: {
         field: ['CANTUSD2019', 'CANTUSD2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel10.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual usd billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         panel10.add(chart010);*/
        //graficos 11
        /*var arraySearchMonth11 = [];
         var arrayDataMonth11 = [];
         var arrayDataGraMonth11 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth11.indexOf(String(Objtemp[i].A1672FPROC).substr(0, 4) && String(Objtemp[i].A1672FPROC).substr(4, 3)) < 0) {
         arraySearchMonth11.push(String(Objtemp[i].A1672FPROC).substr(4, 3));
         arrayDataMonth11.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC).substr(4, 3),
         children: [
         {CANTBILLED: Objtemp[i].CANTBILLED, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)}
         ]
         
         });
         } else {
         arrayDataMonth11[arraySearchMonth11.indexOf(String(Objtemp[i].A1672FPROC).substr(4, 3))].children.push({CANTBILLED: Objtemp[i].CANTBILLED, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)});
         }
         }
         var VL_count2018 = 0;
         var VL_count2019 = 0;
         var VL_count2020 = 0;
         var VL_count2021 = 0;
         var vl_CANTBILLED2018 = 0;
         var vl_CANTBILLED2019 = 0;
         var vl_CANTBILLED2020 = 0;
         var vl_CANTBILLED2021 = 0;
         for (var i = 0; i < arrayDataMonth11.length; ++i) {
         vl_CANTBILLED2018 = 0;
         vl_CANTBILLED2019 = 0;
         vl_CANTBILLED2020 = 0;
         vl_CANTBILLED2021 = 0;
         for (var vi = 0; vi < arrayDataMonth11[i].children.length; ++vi) {
         if (arrayDataMonth11[i].children[vi].A3389ANIO === '2018') {
         vl_CANTBILLED2018 += parseFloat(arrayDataMonth11[i].children[vi].CANTBILLED);
         VL_count2018 = (VL_count2018 + 1);
         }
         if (arrayDataMonth11[i].children[vi].A3389ANIO === '2019') {
         vl_CANTBILLED2019 += parseFloat(arrayDataMonth11[i].children[vi].CANTBILLED);
         VL_count2019 = (VL_count2019 + 1);
         }
         if (arrayDataMonth11[i].children[vi].A3389ANIO === '2020') {
         vl_CANTBILLED2020 += parseFloat(arrayDataMonth11[i].children[vi].CANTBILLED);
         VL_count2020 = (VL_count2020 + 1);
         }
         if (arrayDataMonth11[i].children[vi].A3389ANIO === '2021') {
         vl_CANTBILLED2021 += parseFloat(arrayDataMonth11[i].children[vi].CANTBILLED);
         VL_count2021 = (VL_count2021 + 1);
         }
         }
         arrayDataGraMonth11.push({month: arrayDataMonth11[i].A1672FPROC, CANTBILLED2018: vl_CANTBILLED2018, CANTBILLED2019: vl_CANTBILLED2019, CANTBILLED2020: vl_CANTBILLED2020, CANTBILLED2021: vl_CANTBILLED2021});
         
         }
         var storeMonth11 = Ext.create('Ext.data.Store', {
         fields: ['month', 'CANTBILLED2018', 'CANTBILLED2019', 'CANTBILLED2020', 'CANTBILLED2021'],
         data: arrayDataGraMonth11
         
         });
         var chart11 = null;
         
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_1',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity Current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2018', 'CANTBILLED2019', 'CANTBILLED2020', 'CANTBILLED2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTBILLED2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTBILLED2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_2',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2018', 'CANTBILLED2019', 'CANTBILLED2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTBILLED2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 !== 0 && VL_count2019 !== 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_3',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2018', 'CANTBILLED2019'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTBILLED2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 !== 0 && VL_count2019 === 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_4',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2018'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2018',
         xField: 'month',
         yField: 'CANTBILLED2018',
         marker: {
         type: 'triangle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 === 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_5',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2019'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_6',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 === 0 && VL_count2021 !== 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_7',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTBILLED2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 === 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_8',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2020', 'CANTBILLED2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTBILLED2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 !== 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_9',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2019', 'CANTBILLED2020', 'CANTBILLED2021'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         
         {
         type: 'line',
         title: '2021',
         xField: 'month',
         yField: 'CANTBILLED2021',
         marker: {
         type: 'circle',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         if (VL_count2018 === 0 && VL_count2019 !== 0 && VL_count2020 !== 0 && VL_count2021 === 0) {
         chart11 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe11_10',
         items: [
         {
         xtype: 'cartesian',
         width: 1400,
         height: 360,
         insetPadding: '10 40 0 10',
         autoScroll: true,
         store: storeMonth11,
         legend: {
         type: 'sprite',
         docked: 'right'
         },
         captions: {
         title: {
         text: 'Comparative billing quantity current year vs previous year ',
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         
         axes: [
         {
         type: 'numeric',
         fields: ['CANTBILLED2019', 'CANTBILLED2020'],
         position: 'left',
         grid: true,
         minimum: 0,
         renderer: 'onAxisLabelRender3'
         }, {
         type: 'category',
         fields: 'month',
         position: 'bottom',
         grid: true,
         label: {
         rotate: {
         degrees: -45
         }
         }
         }
         ],
         series: [
         {
         type: 'line',
         title: '2019',
         xField: 'month',
         yField: 'CANTBILLED2019',
         marker: {
         type: 'arrow',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         },
         {
         type: 'line',
         title: '2020',
         xField: 'month',
         yField: 'CANTBILLED2020',
         marker: {
         type: 'cross',
         animation: {
         duration: 200,
         easing: 'backOut'
         }
         },
         highlightCfg: {
         scaling: 2
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender3'
         }
         }
         ]
         
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel11.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: 'Comparative billing quantity current year vs previous year ' + txtFilterDateFrom + "  to " + txtFilterDateTo
         });
         }
         }
         ]
         });
         }
         panel11.add(chart11);
         graficos 12
         var arraySearchMonth12 = [];
         var arrayDataMonth12 = [];
         var arrayDataGraMonth12 = [];
         for (var i = 0; i < Objtemp.length; ++i) {
         if (arraySearchMonth12.indexOf(String(Objtemp[i].A1672FPROC).substr(0, 4) && String(Objtemp[i].A1672FPROC).substr(4, 3)) < 0) {
         arraySearchMonth12.push(String(Objtemp[i].A1672FPROC).substr(4, 3));
         arrayDataMonth12.push({
         A1672FPROC: String(Objtemp[i].A1672FPROC).substr(4, 3),
         children: [
         {CANTBILLED: Objtemp[i].CANTBILLED, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)}
         ]
         
         });
         } else {
         arrayDataMonth12[arraySearchMonth12.indexOf(String(Objtemp[i].A1672FPROC).substr(4, 3))].children.push({CANTBILLED: Objtemp[i].CANTBILLED, A3389MES: String(Objtemp[i].A1672FPROC).substr(4, 3), A3389ANIO: String(Objtemp[i].A1672FPROC).substr(0, 4)});
         }
         }
         
         var vl_cantaver2018 = 0;
         var vl_cantaver2019 = 0;
         var vl_cantaver2020 = 0;
         var vl_cantaver2021 = 0;
         this.totalaver2018 = 0;
         this.totalaver2019 = 0;
         this.totalaver2020 = 0;
         this.totalaver2021 = 0;
         var vl_countaver2018 = 0;
         var vl_countaver2019 = 0;
         var vl_countaver2020 = 0;
         var vl_countaver2021 = 0;
         //
         var vl_dataver2018 = 0;
         var vl_dataver2019 = 0;
         var vl_dataver2020 = 0;
         var vl_dataver2021 = 0;
         
         var VL_BILLEDUSD = 0;
         for (var i = 0; i < arrayDataMonth12.length; ++i) {
         vl_cantaver2018 = 0;
         vl_cantaver2019 = 0;
         vl_cantaver2020 = 0;
         vl_cantaver2021 = 0;
         for (var vi = 0; vi < arrayDataMonth12[i].children.length; ++vi) {
         if (arrayDataMonth12[i].children[vi].A3389ANIO === '2018') {
         vl_cantaver2018 += parseFloat(arrayDataMonth12[i].children[vi].CANTBILLED);
         vl_dataver2018 += vl_cantaver2018;
         vl_countaver2018 = (vl_countaver2018 + 1);
         }
         if (arrayDataMonth12[i].children[vi].A3389ANIO === '2019') {
         vl_cantaver2019 += parseFloat(arrayDataMonth12[i].children[vi].CANTBILLED);
         vl_dataver2019 += vl_cantaver2019;
         vl_countaver2019 = (vl_countaver2019 + 1);
         }
         if (arrayDataMonth12[i].children[vi].A3389ANIO === '2020') {
         vl_cantaver2020 += parseFloat(arrayDataMonth12[i].children[vi].CANTBILLED);
         vl_dataver2020 += vl_cantaver2020;
         vl_countaver2020 = (vl_countaver2020 + 1);
         }
         if (arrayDataMonth12[i].children[vi].A3389ANIO === '2021') {
         vl_cantaver2021 += parseFloat(arrayDataMonth12[i].children[vi].CANTBILLED);
         vl_dataver2021 += vl_cantaver2021;
         vl_countaver2021 = (vl_countaver2021 + 1);
         }
         }
         arrayDataGraMonth12.push({month: arrayDataMonth12[i].A1672FPROC, cantaver2018: vl_cantaver2018, cantaver2019: vl_cantaver2019, cantaver2020: vl_cantaver2020, cantaver2021: vl_cantaver2021});
         
         }
         
         
         if (vl_countaver2018 !== 0) {
         this.totalaver2018 = (vl_dataver2018 / vl_countaver2018);
         }
         if (vl_countaver2019 !== 0) {
         this.totalaver2019 = (vl_dataver2019 / vl_countaver2019);
         }
         if (vl_countaver2020 !== 0) {
         this.totalaver2020 = (vl_dataver2020 / vl_countaver2020);
         }
         if (vl_countaver2021 !== 0) {
         this.totalaver2021 = (vl_dataver2021 / vl_countaver2021);
         }
         var storeMonth11 = Ext.create('Ext.data.Store', {
         fields: ['month', 'cantaver2018', 'cantaver2019', 'cantaver2020', 'cantaver2021'],
         data: arrayDataGraMonth12
         
         });
         
         var chart012 = null;
         
         if (vl_countaver2018 !== 0 && vl_countaver2019 !== 0 && vl_countaver2020 !== 0 && vl_countaver2021 !== 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_1',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.totalaver2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.totalaver2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019', '2020', '2021'],
         xField: 'month',
         yField: ['cantaver2018', 'cantaver2019', 'cantaver2020', 'cantaver2021'],
         label: {
         field: ['cantaver2018', 'cantaver2019', 'cantaver2020', 'cantaver2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 !== 0 && vl_countaver2019 !== 0 && vl_countaver2020 !== 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_2',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.totalaver2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019', '2020'],
         xField: 'month',
         yField: ['cantaver2018', 'cantaver2019', 'cantaver2020'],
         label: {
         field: ['cantaver2018', 'cantaver2019', 'cantaver2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 !== 0 && vl_countaver2019 !== 0 && vl_countaver2020 === 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_3',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.totalaver2018, '0,000'),
         fontSize: 14
         }
         }
         }, {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018', '2019'],
         xField: 'month',
         yField: ['cantaver2018', 'cantaver2019'],
         label: {
         field: ['cantaver2018', 'cantaver2019'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 !== 0 && vl_countaver2019 === 0 && vl_countaver2020 === 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_4',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2018,
         line: {
         strokeStyle: 'MAROON',
         lineDash: [6, 3],
         title: {
         text: '2018 Average ' + Ext.util.Format.number(this.totalaver2018, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2018'],
         xField: 'month',
         yField: ['cantaver2018'],
         label: {
         field: ['cantaver2018'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 !== 0 && vl_countaver2020 === 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_6',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019'],
         xField: 'month',
         yField: ['cantaver2019'],
         label: {
         field: ['cantaver2019'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 === 0 && vl_countaver2020 !== 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_7',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2020'],
         xField: 'month',
         yField: ['cantaver2020'],
         label: {
         field: ['cantaver2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 === 0 && vl_countaver2020 === 0 && vl_countaver2021 !== 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_8',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.totalaver2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2021'],
         xField: 'month',
         yField: ['cantaver2021'],
         label: {
         field: ['cantaver2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 === 0 && vl_countaver2020 !== 0 && vl_countaver2021 !== 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_9',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.totalaver2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2020', '2021'],
         xField: 'month',
         yField: ['cantaver2020', 'cantaver2021'],
         label: {
         field: ['cantaver2020', 'cantaver2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 !== 0 && vl_countaver2020 !== 0 && vl_countaver2021 !== 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_10',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2021,
         line: {
         strokeStyle: 'PURPLE',
         lineDash: [6, 3],
         title: {
         text: '2021 Average ' + Ext.util.Format.number(this.totalaver2021, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019', '2020', '2021'],
         xField: 'month',
         yField: ['cantaver2019', 'cantaver2020', 'cantaver2021'],
         label: {
         field: ['cantaver2019', 'cantaver2020', 'cantaver2021'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         if (vl_countaver2018 === 0 && vl_countaver2019 !== 0 && vl_countaver2020 !== 0 && vl_countaver2021 === 0) {
         chart012 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficosmonthDe12_11',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 400,
         captions: {
         title: {
         text: "Average annual quantity billing per month",
         alignTo: 'chart'
         },
         subtitle: {
         text: txtFilterDateFrom + " - " + cmbDateFromMonth + " to " + txtFilterDateTo + " - " + cmbDateToMonth,
         alignTo: 'chart'
         }
         },
         theme: 'Muted',
         interactions: ['itemhighlight'],
         animation: {
         duration: 200
         },
         store: storeMonth11,
         legend: {
         type: 'dom',
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         position: 'left',
         limits: [
         {
         value: this.totalaver2019,
         line: {
         strokeStyle: 'red',
         lineDash: [6, 3],
         title: {
         text: '2019 Average ' + Ext.util.Format.number(this.totalaver2019, '0,000'),
         fontSize: 14
         }
         }
         },
         {
         value: this.totalaver2020,
         line: {
         strokeStyle: 'NAVY',
         lineDash: [6, 3],
         title: {
         text: '2020 Average ' + Ext.util.Format.number(this.totalaver2020, '0,000'),
         fontSize: 14
         }
         }
         }
         
         ]
         },
         {
         type: 'category3d',
         position: 'bottom',
         fields: 'month',
         grid: true
         }
         ],
         series: {
         type: 'bar3d',
         stacked: false,
         title: ['2019', '2020'],
         xField: 'month',
         yField: ['cantaver2019', 'cantaver2020'],
         label: {
         field: ['cantaver2019', 'cantaver2020'],
         display: 'insideEnd',
         renderer: 'onSeriesLabelRender'
         },
         highlight: true,
         style: {
         inGroupGapWidth: -7
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender4'
         }
         }
         }
         ],
         listeners: {
         afterrender: function (obj) {
         panel12.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function (btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Average annual quantity billing per month" + txtFilterDateFrom + " - " + cmbDateFromMonth + " To " + txtFilterDateTo + " - " + cmbDateToMonth
         });
         }
         }
         ]
         });
         }
         
         panel12.add(chart012);*/

    },
    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value, '0,000');
    },
    onSeriesLabelRenderm: function (value) {
        return Ext.util.Format.number(value, '0,000');
    },
    onTooltip3Render: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onTooltip3Render_Porce: function (tooltip, record, item) {
        var me = this;
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);
        tooltip.setHtml(sector + ': ' + Ext.util.Format.number(value, '0,000') + ' (' + Ext.util.Format.number((record.data.CANTADMACEP) * 100, '0.00') + ') %');

    },
    onSeriesLabelRenderm_Porce: function (value, record, item) {
        //console.log(record)    
        return Ext.util.Format.number(value, '0,000'); //+ ' (' + Ext.util.Format.number((value / me.totalPoce) * 100, '0.00') + ') %';

    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        var total = axis.getRange()[1];

        return (label / total * 100).toFixed(0) + '%';
    },
    onLineSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('anio') + ': ' + Ext.util.Format.number(record.get('ACUMULADO'), '0,000'));
    },
    onLineSeriesTooltipRender2: function (tooltip, record, item) {
        tooltip.setHtml(record.get('anio') + ': ' + Ext.util.Format.number(record.get('ACUMULADOPed'), '0,000'));
    },
    onSeriesTooltipRender3: function (tooltip, record, item) {
        var title = item.series.getTitle();
        tooltip.setHtml(title + ' on ' + record.get('month') + ': ' +
                Ext.util.Format.number(record.get(item.series.getYField()), '0,000'));
    },
    onSeriesTooltipRender4: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onAxisLabelRender3: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
    },
    onSeriesLabelRenderAverage: function (v) {
        return Ext.util.Format.number(v, '0,000');
    },
    onTooltipRenderAverage: function (tooltip, record, item) {
        tooltip.setHtml(record.get('month') + ': ' +
                Ext.util.Format.number(record.get('BILLEDUSD'), '0,000'));
    },
    onAxisRangeAfterRender: function (axis, visibleRange, eOptsbj) {
        console.log(axis);
        var chart = axis.getChart(),
                store = chart.getStore(),
                average = store.average('ind');

        axis.setLimits({
            value: average,
            line: {
                title: {
                    text: 'Average high: ' + average.toFixed(2)
                },
                lineDash: [2, 2]
            }
        });
    },

    onAxisRangeChange: function (axis, range) {
        var chart = axis.getChart(),
                store = chart.getStore(),
                average = store.average('ind');

        if (average) {
            axis.setLimits({
                value: average,
                line: {
                    title: {
                        text: 'Average high: ' + average.toFixed(2)
                    },
                    lineDash: [2, 2]
                }
            });
        } else {
            axis.setLimits(null);
        }
    }
});


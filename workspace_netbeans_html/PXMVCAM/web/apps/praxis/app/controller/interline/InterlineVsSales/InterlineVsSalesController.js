Ext.define('Ext.Praxis.controller.interline.InterlineVsSales.InterlineVsSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineVsSalesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    childs: '',
    panelActual: '',
    bean: {},
    beanTkt: {},
    searchParamsTktType: {},
    paramsCIA: {},
    _path: '',
    _pathDetail: '',
    _pathWRF014: '',
    usu: '',
    drillDown: [],
    beanProMasterTicket: {},
    // </editor-fold>
    init: function (view) {
        me = this;
        prototype.id = 'InterlineVsSalesForm';
        prototype.url = CONTEXTPATH + '/InterlineVsSales';

        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setStoreData();
        this.control({
            
//            //   -------------------Eventos Genericos --------------------
            '#InterlineVsSalesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InterlineVsSalesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InterlineVsSalesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InterlineVsSalesForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    afterRender: function () {

        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;

        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
//        this.setValue('cmbDateFromMonth', mes);
//        this.setValue('cmbDateToMonth', mes);
        
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        
        this.setValue('cmbPERNUM', '');
        this.setValue('cmbAirline', '');
        this.setValue('cmbSource', '');
        this.setValue('txtFareBasis', '');
        this.setValue('txtIATA', '');
        this.setValue('cmbSource', '');
        this.setValue('cmbTypeVta', '');
        this.setValue('cmbSourceVta', '');
        
//         Ext.getCmp(prototype.id + '-abc').show();
        this.imgSearch_clickHandler();
    },
    imgSwap_clickHandler: function() {
//        console.log(me.panelActual);

        var panel = me.panelActual;
        if(panel === '-boxMainData'){
            Ext.getCmp(prototype.id + '-boxMainData').setVisible(!Ext.getCmp(prototype.id + '-boxMainData').isVisible());
            Ext.getCmp(prototype.id + '-boxSwapData').setVisible(!Ext.getCmp(prototype.id + '-boxSwapData').isVisible());
        }else if(panel === '-boxDetCIA'){
            Ext.getCmp(prototype.id + '-boxDetCIA').setVisible(!Ext.getCmp(prototype.id + '-boxDetCIA').isVisible());
            Ext.getCmp(prototype.id + '-boxDetCIASwap').setVisible(!Ext.getCmp(prototype.id + '-boxDetCIASwap').isVisible());
        }console.log(me.panelActual);
        var option = Ext.getCmp(prototype.id + '-gridDataByTkt');
        
    },
    cbxDateFromYear_changeHandler: function () {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function () {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function () {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //TOMANDO LAS AEROLINEAS =======================================
                var lstAirlines = res.lstAirlines;
                var airlines = new Array();
                airlines.push(['', 'All']);
                lstAirlines.forEach(function callback(currentValue, index, array) {
                    airlines.push([currentValue.A005KEY, currentValue.A005KEY + ' - ' + currentValue.A005KEY2]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airlines', autoLoad: true, data: airlines, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAirline').bindStore(store);
                //==============================================================
                //TOMANDO LAS USOS =============================================
                var lstSource = res.lstSource;
                var source = new Array();
                source.push(['', 'All']);
                lstSource.forEach(function callback(currentValue, index, array) {
                    source.push([currentValue.CODSOUR, currentValue.CODSOUR + ' - ' + currentValue.DESSOU]);
                });
                var storeSrc = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'source', autoLoad: true, data: source, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbSource').bindStore(storeSrc);
                //==============================================================
            }
        });
    },
    viewPDFs: function () {
    },
    viewDetail: function (column, e, row, column, x, rowData) {
        /*var data = x.record.data;
         _pathDetail = prototype.url + '/getXLSXDetail?' +
         'A1155CODAC=' + data.A1155CODAC + '&' +
         'A1155INDAC=' + data.A1155INDAC + '&' +
         'A1155VRSAC=' + data.A1155VRSAC;
         
         this.searchDetail(data);*/
    },
    imgSave: function () {
        /*var objWRF014 = {};
         objWRF014.AIRLINE = this.getValue("txtA1155CIAFM");
         objWRF014.CODAC = this.getValue("txtA1155CODAC");
         objWRF014.INDAC = this.getValue("txtA1155INDAC");
         objWRF014.VRSAC = this.getValue("txtA1155VRSAC");
         
         objWRF014.SEQAC = this.getValue("txtSequence");
         objWRF014.REFE = this.getValue("txtReference");
         objWRF014.FBEGIN = this.getValue("txtFBEGIN");
         objWRF014.FENDIN = this.getValue("txtFENDIN");
         objWRF014.FSEND = this.getValue("txtFSEND");
         objWRF014.FRECE = this.getValue("txtFRECE");
         objWRF014.FENTR = this.getValue("txtFENTR");
         
         this.SaveAddendum(objWRF014);*/
    },
    LlenarData: function (data) {
        /*this.setValue('txtA1155AIRLI', data.A1155AIRLI);
         this.setValue('txtA1155CIAFM', data.A1155CIAFM);
         this.setValue('txtA1155CODAC', data.A1155CODAC);
         this.setValue('txtA1155INDAC', data.A1155INDAC);
         this.setValue('txtA1155VRSAC', data.A1155VRSAC);*/
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function (obj, e) {

        this.bean.yearFrom = this.getValue("cmbDateFromYear");
        this.bean.monthFrom = this.getValue("cmbDateFromMonth");
        this.bean.yearTo = this.getValue("cmbDateToYear");
        this.bean.monthTo = this.getValue("cmbDateToMonth");
        this.bean.PERNUM = this.getValue("cmbPERNUM");
        this.bean.BDAIR = this.getValue("cmbAirline");
        this.bean.SOURCOD = this.getValue("cmbSource");
        this.bean.IN_FAREBASIS = this.getValue("txtFareBasis");
        this.bean.IN_IATA = this.getValue("txtIATA");
        this.bean.IN_FUENTE = this.getValue("cmbSourceVta");
        this.bean.IN_CANAL = this.getValue("cmbTypeVta");

        /*_path = prototype.url + '/getXLSX?' +
         'IN_FECHA_FROM=' + this.bean.IN_FECHA_FROM + '&' +
         'IN_FECHA_TO=' + this.bean.IN_FECHA_TO + '&' +
         'IN_STATUS=' + this.bean.IN_STATUS + '&' +
         'IN_AIRLINE=' + this.bean.IN_AIRLINE + '&' +
         'IN_INDICATOR=' + this.bean.IN_INDICATOR;*/

        this.search(this.bean);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgChart_clickHandler: function () {
    },
    imgExcel_clickHandler: function (obj, e) {
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    imgClear_clickHandler: function (obj, e) {
        /*if (Ext.getCmp(prototype.id + '-boxWRF014Data').isVisible()) {
         this.CleanFields();
         }*/
    },
    imgBack_clickHandler: function () {
       if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
//            me.setWidthPie();
//            this.getPaggin();
//            if (me.pagginActual !== '') {
//                var pag = Ext.getCmp(prototype.id + me.pagginActual);
//                var pagData = pag.getPageData();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//            }
        } else {
            global.showMenu();
        }
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.InterlineVsSales.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3713");
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-totQTYTKT').setText('0');
                        Ext.getCmp(prototype.id + '-totVALORS').setText('0');
                        Ext.getCmp(prototype.id + '-totGROSSI').setText('0');
                        Ext.getCmp(prototype.id + '-totDIFF').setText('0');

                        Ext.getCmp(prototype.id + '-totS_QTYTKT').setText('0');
                        Ext.getCmp(prototype.id + '-totS_VALORS').setText('0');
                        Ext.getCmp(prototype.id + '-totS_GROSSI').setText('0');
                        Ext.getCmp(prototype.id + '-totS_DIFF').setText('0');

                        Ext.getCmp(prototype.id + '-totQTYTKTHS').setText('0');
                        Ext.getCmp(prototype.id + '-totVALORSHS').setText('0');
                        Ext.getCmp(prototype.id + '-totGROSSIHS').setText('0');
                        Ext.getCmp(prototype.id + '-totDIFFHS').setText('0');

                        Ext.getCmp(prototype.id + '-totQTYTKTLS').setText('0');
                        Ext.getCmp(prototype.id + '-totVALORSLS').setText('0');
                        Ext.getCmp(prototype.id + '-totGROSSILS').setText('0');
                        Ext.getCmp(prototype.id + '-totDIFFLS').setText('0');

                        Ext.getCmp(prototype.id + '-totQTYTKTHE').setText('0');
                        Ext.getCmp(prototype.id + '-totVALORSHE').setText('0');
                        Ext.getCmp(prototype.id + '-totGROSSIHE').setText('0');
                        Ext.getCmp(prototype.id + '-totDIFFHE').setText('0');

                        Ext.getCmp(prototype.id + '-totQTYTKTLE').setText('0');
                        Ext.getCmp(prototype.id + '-totVALORSLE').setText('0');
                        Ext.getCmp(prototype.id + '-totGROSSILE').setText('0');
                        Ext.getCmp(prototype.id + '-totDIFFLE').setText('0');

                        global.Msg({msg: 'Data not found'});
                    } else {
//                        Ext.getCmp(prototype.id + '-boxPaginacion').show();
                        var data = obj.data.items[0].data;

                        Ext.getCmp(prototype.id + '-totQTYTKT').setText(Ext.util.Format.number(data.totQTYTKT, '0,000'));
                        Ext.getCmp(prototype.id + '-totVALORS').setText(Ext.util.Format.number(data.totVALORS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totGROSSI').setText(Ext.util.Format.number(data.totGROSSI, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDIFF').setText(Ext.util.Format.number(data.totDIFF, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totS_QTYTKT').setText(Ext.util.Format.number(data.totQTYTKT, '0,000'));
                        Ext.getCmp(prototype.id + '-totS_VALORS').setText(Ext.util.Format.number(data.totVALORS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totS_GROSSI').setText(Ext.util.Format.number(data.totGROSSI, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totS_DIFF').setText(Ext.util.Format.number(data.totDIFF, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totQTYTKTHS').setText(Ext.util.Format.number(data.totQTYTKTHS, '0,000'));
                        Ext.getCmp(prototype.id + '-totVALORSHS').setText(Ext.util.Format.number(data.totVALORSHS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totGROSSIHS').setText(Ext.util.Format.number(data.totGROSSIHS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDIFFHS').setText(Ext.util.Format.number(data.totDIFFHS, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totQTYTKTLS').setText(Ext.util.Format.number(data.totQTYTKTLS, '0,000'));
                        Ext.getCmp(prototype.id + '-totVALORSLS').setText(Ext.util.Format.number(data.totVALORSLS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totGROSSILS').setText(Ext.util.Format.number(data.totGROSSILS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDIFFLS').setText(Ext.util.Format.number(data.totDIFFLS, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totQTYTKTHE').setText(Ext.util.Format.number(data.totQTYTKTHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totVALORSHE').setText(Ext.util.Format.number(data.totVALORSHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totGROSSIHE').setText(Ext.util.Format.number(data.totGROSSIHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDIFFHE').setText(Ext.util.Format.number(data.totDIFFHE, '0,000'));
//                        
                        Ext.getCmp(prototype.id + '-totQTYTKTLE').setText(Ext.util.Format.number(data.totQTYTKTLE, '0,000'));
                        Ext.getCmp(prototype.id + '-totVALORSLE').setText(Ext.util.Format.number(data.totVALORSLE, '0,000'));
                        Ext.getCmp(prototype.id + '-totGROSSILE').setText(Ext.util.Format.number(data.totGROSSILE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDIFFLE').setText(Ext.util.Format.number(data.totDIFFLE, '0,000.00'));
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridSwapData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OnViewDetByCia">
    OnViewDetByCia: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

//        console.log("OnViewDetByCia");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetCIA';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.paramsTDOC = rowData.data;
        this.SetOnViewDetByCia(rowData.data);
    },
    SetOnViewDetByCia: function (par) {
        win.lblUser_toolTip("Estructura: A3713");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCia'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(par)};
//                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-totDC_QTYTKT').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_VALORS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_GROSSI').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_DIFF').setText('0');

                        Ext.getCmp(prototype.id + '-totDCS_QTYTKT').setText('0');
                        Ext.getCmp(prototype.id + '-totDCS_VALORS').setText('0');
                        Ext.getCmp(prototype.id + '-totDCS_GROSSI').setText('0');
                        Ext.getCmp(prototype.id + '-totDCS_DIFF').setText('0');

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTHS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_VALORSHS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_GROSSIHS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_DIFFHS').setText('0');

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTLS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_VALORSLS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_GROSSILS').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_DIFFLS').setText('0');

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTHE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_VALORSHE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_GROSSIHE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_DIFFHE').setText('0');

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTLE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_VALORSLE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_GROSSILE').setText('0');
                        Ext.getCmp(prototype.id + '-totDC_DIFFLE').setText('0');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
//                            console.log(data);

                        Ext.getCmp(prototype.id + '-gridDetCiaAC').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        Ext.getCmp(prototype.id + '-gridDetCiaSwap').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(data.strTitulo);
                        
                        Ext.getCmp(prototype.id + '-totDC_QTYTKT').setText(Ext.util.Format.number(data.totQTYTKT, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_VALORS').setText(Ext.util.Format.number(data.totVALORS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_GROSSI').setText(Ext.util.Format.number(data.totGROSSI, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_DIFF').setText(Ext.util.Format.number(data.totDIFF, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totDCS_QTYTKT').setText(Ext.util.Format.number(data.totQTYTKT, '0,000'));
                        Ext.getCmp(prototype.id + '-totDCS_VALORS').setText(Ext.util.Format.number(data.totVALORS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDCS_GROSSI').setText(Ext.util.Format.number(data.totGROSSI, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDCS_DIFF').setText(Ext.util.Format.number(data.totDIFF, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTHS').setText(Ext.util.Format.number(data.totQTYTKTHS, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_VALORSHS').setText(Ext.util.Format.number(data.totVALORSHS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_GROSSIHS').setText(Ext.util.Format.number(data.totGROSSIHS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_DIFFHS').setText(Ext.util.Format.number(data.totDIFFHS, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTLS').setText(Ext.util.Format.number(data.totQTYTKTLS, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_VALORSLS').setText(Ext.util.Format.number(data.totVALORSLS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_GROSSILS').setText(Ext.util.Format.number(data.totGROSSILS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_DIFFLS').setText(Ext.util.Format.number(data.totDIFFLS, '0,000.00'));

                        Ext.getCmp(prototype.id + '-totDC_QTYTKTHE').setText(Ext.util.Format.number(data.totQTYTKTHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_VALORSHE').setText(Ext.util.Format.number(data.totVALORSHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_GROSSIHE').setText(Ext.util.Format.number(data.totGROSSIHE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_DIFFHE').setText(Ext.util.Format.number(data.totDIFFHE, '0,000'));
//                        
                        Ext.getCmp(prototype.id + '-totDC_QTYTKTLE').setText(Ext.util.Format.number(data.totQTYTKTLE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_VALORSLE').setText(Ext.util.Format.number(data.totVALORSLE, '0,000'));
                        Ext.getCmp(prototype.id + '-totDC_GROSSILE').setText(Ext.util.Format.number(data.totGROSSILE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totDC_DIFFLE').setText(Ext.util.Format.number(data.totDIFFLE, '0,000.00'));
                    }
//                        me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetCiaAC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetCiaSwap').bindStore(storeGridDatas);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="OnViewDetByTktType">
    OnViewDetByTktType: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//        console.log("OnViewDetByTktType");
        var rec = rowData.data;
        
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetTKTType';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        me.beanTkt.BDATE = rec.BDATE;
        me.beanTkt.BDAIR = rec.BDAIR;
        if(columnNum === 5){
            me.beanTkt.IN_TRNCU = "SALE";
            me.beanTkt.IN_FVALUE = "H";
        }else if(columnNum === 9){
            me.beanTkt.IN_TRNCU = "SALE";
            me.beanTkt.IN_FVALUE = "L";
        }
        me.beanTkt.TYPE = "DIFER";
        me.beanTkt.IN_ORDER = "DESC";
        me.beanTkt.strTitulo = rec.strTitulo;
        
        var beanString = JSON.stringify(me.beanTkt);
        searchParamsTktType = {
            beanString: beanString,
            bean: me.beanTkt
        };
//        console.log(searchParamsTktType);
        this.SetOnViewDetByTktType();
    },
    SetOnViewDetByTktType: function (par) {
        win.lblUser_toolTip("Estructura: A3714 / SFI020");
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktByType'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParamsTktType;
//                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-totT_VALOR').setText('0');
                        Ext.getCmp(prototype.id + '-totT_GROSS').setText('0');
                        Ext.getCmp(prototype.id + '-totT_DIFF').setText('0');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
//                            console.log(data);
                        // <editor-fold defaultstate="collapsed" desc="paggin">
                            var pag = Ext.getCmp(prototype.id + '-paggin');
                            var pagData = pag.getPageData();

                            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                            var total = Ext.util.Format.number(pagData.total, '0,000');

                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                        // </editor-fold>

                        Ext.getCmp(prototype.id + '-gridDetTktType').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                        Ext.getCmp(prototype.id + '-totT_VALOR').setText(Ext.util.Format.number(data.totGROSSI, '0,000'));
                        Ext.getCmp(prototype.id + '-totT_GROSS').setText(Ext.util.Format.number(data.totVALORS, '0,000.00'));
                        Ext.getCmp(prototype.id + '-totT_DIFF').setText(Ext.util.Format.number(data.totDIFF, '0,000.00'));
                    }
                        me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetTktType').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
     
    
    ////<editor-fold defaultstate="collapsed" desc="search2">
    search2: function (bean) {
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.InterlineVsSales.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SFI020");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
                        Ext.getCmp(prototype.id + '-boxPaginacion').show();
                        var bean = obj.data.items[0].data;
                        //me.usu = bean.A1155UMODI;
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="displayMasterTkt">
    displayMasterTkt: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
        var rec = rowData.data;
        this.beanProMasterTicket.IN_CIA = rec.AIRNUM.trim().substring(1),
        this.beanProMasterTicket.IN_FORMA = rec.TKTNUM.trim().substring(1, 5),
        this.beanProMasterTicket.IN_SERIE = rec.TKTNUM.trim().substring(5, 11),
//        this.beanProMasterTicket.IN_SEQ = rec.CPNNUM.trim();
        console.log(this.beanProMasterTicket);
        
        prototypeProgram.view = 'interline-interline-vs-sales-form';
        prototypeProgram.nprog = 'PX00000209';
        prototypeProgram.title = 'Interline Vs Sales Difference';
        prototypeProgram.modulo = '';

        win.displayProMasterTicket(this, 'InterlineVsSalesController', this.beanProMasterTicket);
        
//        var rec = rowData.data;
//        var masterParams = {
//            IN_CIA: rec.AIRNUM.trim().substring(1),
//            IN_FORMA: rec.TKTNUM.trim().substring(1, 5),
//            IN_SERIE: rec.TKTNUM.trim().substring(5, 11),
//            //IN_SERIE: rec.CPNNUM,
//            IN_SEQ: '00'
//        };

//        Ext.Ajax.request({
//            url: CONTEXTPATH + '/MasterTicket/loadTicket',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
//            params: masterParams,
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                var filterTKT = res.filterTKT;
//                var facsimil = Ext.create('Ext.Praxis.view.program.MasterTicketForm.Facsimil', {
//                    id: 'MasterTicketForm-masterTicket',
//                    params: {
//                        bean: filterTKT
//                    }
//                });
//                facsimil.setId("MasterTicketForm-masterTicket");
//                facsimil.show();
//                Ext.getCmp(prototype.id + '-gridData').unmask();
//            }
//        });
    },
    //</editor-fold>

    CleanFields: function () {
        this.setValue('txtReference', '');
        this.setValue('txtFBEGIN', '');
        this.setValue('txtFENDIN', '');
        this.setValue('txtFSEND', '');
        this.setValue('txtFRECE', '');
        this.setValue('txtFENTR', '');
        this.setValue('txtSequence', '');
    },
    exportExcel: function () {
//        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case  '-boxDetCIA':
                global.getFile(prototype.url + '/getXLSX_CIA?beanString=' + encodeURI(JSON.stringify(this.paramsTDOC)));
                break;
            case '-boxDetTKTType':
                global.getFile(prototype.url + '/getXLSX_TKTType?beanString=' + searchParamsTktType.beanString);
                break;
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxDetTKTType':
                me.pagginActual = '-paggin';
                break;
        }
    },
    setWidthPie: function () {
//        switch (me.panelActual) {
//            case  '-panelGridData':
//        console.log(prototype.id + '-pie');
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        console.log(ancho);
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (box) {
        box = prototype.id + '-' + box;
        var b;
        for (var i = 0; i < this.childs.length; i++) {
            b = this.childs[i];
            if (b.id === box)
                b.show();
            else
                b.hide();
        }
    },
    getValue: function (id) {
        //console.log('getValue ' + id);
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        //console.log('setValue ' + id + ' ** ' + txt);
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});

Ext.define('Ext.Praxis.controller.sales.StatisticalsReportBySource.StatisticalsReportBySourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StatisticalsReportBySourceController',
    beanXLS: {},
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function () {
        this.setStoreData();
        this.btnSearch_click();
    },
    onSalesSourceChange: function(cmp, newValue) {
        switch (newValue) {
            case 'ASR':
                Ext.getCmp(prototype.id+'-cmbChannel').enable(true);
                break;
            default:
                Ext.getCmp(prototype.id+'-cmbChannel').disable(true);
                break;
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateYear').setValue( new Date().getFullYear() );
        this.loadCountry();
        this.setValue('cmbCountry', '');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var bean = {};
        bean.VP_CUSTOM  = '139';
        bean.VP_TIPO  = this.getValue('cmbPeriodType');
        bean.VP_AGRUPA  = this.getValue('rbtnIATA').rbtnIATA;
        bean.VP_AFETNU  = this.getValue('cmbTransactionType');
        bean.VP_MONEDA  = this.getValue('cmbCurrency');
        bean.VP_PERIOD  = this.getValue('cmbDateYear');
        bean.VP_FUENTE  = this.getValue('cmbSalesSource');
        bean.VP_SFUENT  = bean.VP_FUENTE === 'ASR' ? this.getValue('cmbChannel') : '';
        bean.VP_PAISVE  = this.getValue('cmbCountry');
        bean.VP_AGENTE  = this.getValue('txtIATA').trim();
        
        if(bean.VP_FUENTE === 'ASR') Ext.getCmp(prototype.id+'-cl_canal').show();
        else Ext.getCmp(prototype.id+'-cl_canal').hide();
        if ( bean.VP_AGRUPA === 'Y' ){
            Ext.getCmp(prototype.id+'-iata_number').show();
            Ext.getCmp(prototype.id+'-iata_name').show();
        }else{
            Ext.getCmp(prototype.id+'-iata_number').hide();
            Ext.getCmp(prototype.id+'-iata_name').hide();
        }
//        Parametros para reporte EXCEL
        me.beanXLS.VP_CUSTOM = bean.VP_CUSTOM;
        me.beanXLS.VP_TIPO   = bean.VP_TIPO;
        me.beanXLS.VP_AGRUPA = bean.VP_AGRUPA;
        me.beanXLS.VP_AFETNU = bean.VP_AFETNU;
        me.beanXLS.VP_MONEDA = bean.VP_MONEDA;
        me.beanXLS.VP_PERIOD = bean.VP_PERIOD;
        me.beanXLS.VP_FUENTE = bean.VP_FUENTE;
        me.beanXLS.VP_SFUENT = bean.VP_SFUENT;
        me.beanXLS.VP_PAISVE = bean.VP_PAISVE;
        me.beanXLS.VP_AGENTE = bean.VP_AGENTE;        
//        _path = prototype.url+'/getXLSX?' +
//        _path = prototype.url+'/getXLSXAPI?' +
//            'VP_CUSTOM='+bean.VP_CUSTOM+'&' +
//            'VP_TIPO='+bean.VP_TIPO+'&' +
//            'VP_AGRUPA='+bean.VP_AGRUPA+'&' +
//            'VP_AFETNU='+bean.VP_AFETNU+'&' +
//            'VP_MONEDA='+bean.VP_MONEDA+'&' +
//            'VP_PERIOD='+bean.VP_PERIOD+'&' +
//            'VP_FUENTE='+bean.VP_FUENTE+'&' +
//            'VP_SFUENT='+bean.VP_SFUENT+'&' +
//            'VP_PAISVE='+bean.VP_PAISVE+'&' +
//            'VP_AGENTE='+bean.VP_AGENTE;    
        this.search(bean);
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
//                  this.exportExcel();
                    global.getFile(prototype.url + '/getXLSXAPI?beanString=' + encodeURI(JSON.stringify(this.beanXLS)));
                }
            }
        });
    },
    btnClear_click: function(obj, e) {        
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.StatisticalsReportBySource.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2775X");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="loadCountry">
    loadCountry: function() {
        Ext.Ajax.request({
            url: prototype.url+'/loadCountry',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstCountry = res.lstCountry;
                    var country = new Array();
                    country.push(['', 'All']);
                    lstCountry.forEach(function callback(currentValue, index, array) {
                        country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbCountry').bindStore(store);
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
//    exportExcel: function() {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            global.getFile(_path);
//        }
//    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});

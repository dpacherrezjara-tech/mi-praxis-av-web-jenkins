Ext.define('Ext.Praxis.controller.gerencial.GdsAudit.GdsAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GdsAuditController',
    requires: [
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info1',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info61',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info62',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info63',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info71',
        'Ext.Praxis.view.gerencial.GdsAuditForm.Info72'

    ],
    beanXLS: {}, 
    gridtree01: {},
    gridData61: {},
    gridData62: {},
    gridData63: {},
    page_current: 0,
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function() {
        //Ext.get('divTitle').update('GDS Analysis');        
        //this.Onsearch();
        
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.Onsearch();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function(obj, e) {

    },
    onGenerateADMClick: function(obj){
        
    },
    btnClear_click: function(obj, e) {
       // Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnBack_click: function() {

        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible() && this.page_current === 1) {
            global.showMenu();
        }
        
//        Ext.getCmp(prototype.id + '-cont-filter00').hide();
//        Ext.getCmp(prototype.id + '-cont-filter01').hide();
//        Ext.getCmp(prototype.id + '-cont-filter02').hide();
//        Ext.getCmp(prototype.id + '-cont-filter03').hide();
        
        if (this.page_current > 1)
            this.page_current = this.page_current - 1;
        
        if (this.page_current === 1)
            this.Onsearch();
        if (this.page_current === 2)
            this.onDetailClick(null,0 ,0);
        if (this.page_current === 3)
            this.onDetailClick01(null,0 ,0);
        if (this.page_current === 4)
            this.onDetailClick02(null,0 ,0);        

    },
    // </editor-fold>    

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    onCmbFilterByChange: function(obj, newValue, oldValue, eOpts) {
        switch (newValue) {
            case '00':
                Ext.getCmp(prototype.id + '-cmb-year').setVisible(true);
                Ext.getCmp(prototype.id + '-cmb-month_').setVisible(true);
                Ext.getCmp(prototype.id + '-cmb-month').setVisible(false);
                Ext.getCmp(prototype.id + '-chk-prodimp').setVisible(false);
                Ext.getCmp(prototype.id + '-rbtn-iata').setVisible(false);                
                break;
            case '01':
                Ext.getCmp(prototype.id + '-cmb-year').setVisible(true);
                Ext.getCmp(prototype.id + '-cmb-month_').setVisible(false);
                Ext.getCmp(prototype.id + '-cmb-month').setVisible(true);
                Ext.getCmp(prototype.id + '-chk-prodimp').setVisible(true);
                Ext.getCmp(prototype.id + '-rbtn-iata').setVisible(true);
                break;
            case '02':
                Ext.getCmp(prototype.id + '-cmb-year').setVisible(true);
                Ext.getCmp(prototype.id + '-cmb-month_').setVisible(false);
                Ext.getCmp(prototype.id + '-cmb-month').setVisible(true);
                Ext.getCmp(prototype.id + '-chk-prodimp').setVisible(true);
                Ext.getCmp(prototype.id + '-rbtn-iata').setVisible(true);
                break;
            case '03':
                Ext.getCmp(prototype.id + '-cmb-year').setVisible(true);
                Ext.getCmp(prototype.id + '-cmb-month_').setVisible(false);
                Ext.getCmp(prototype.id + '-cmb-month').setVisible(true);
                Ext.getCmp(prototype.id + '-chk-prodimp').setVisible(true);
                Ext.getCmp(prototype.id + '-rbtn-iata').setVisible(true);
                break;
        }        
        this.Onsearch();
    },
    Onsearch: function() {
        var filter = Ext.getCmp(prototype.id + '-cmb-type').getValue();
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        switch (filter) {
            case '00':
                this.search00();
                break;
            case '01':
                this.search01();
                break;
            case '02':
                this.search02();
                break;
            case '03':
                this.search03();
                break;
        }
    },
    search00: function() {
        this.page_current = 1;
        //console.log('page: ' + this.page_current);
        //Ext.getCmp(prototype.id + '-boxPaginacion').hide();        
        var bean = {};
        var fecha = new Date();
        var year = Ext.getCmp(prototype.id + '-cmb-year').getValue();
        year = year === undefined || year === null ? fecha.getFullYear() : year;
        var month = Ext.getCmp(prototype.id + '-cmb-month_').getValue();
        
        if (month !== '')
//            month = month === undefined || month === null ? Ext.String.leftPad(fecha.getMonth() + 1, 2, '0') : month;
              month = month === undefined || month === null ? '' : month;
        
        //bean.option = "QRY_GDS_AUDIT_06";
        bean.VP_YEAR = year;
        bean.VP_MONTH = month;
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-ContenedorMain'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: prototype.url + '/search05',
            timeout: 60000000,
            method: 'GET',
            params: bean,
            success: function(response, options) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                res = res.data;
                var a = [];
                var TOT_NET_X = 0;
                var TOT_BN_X = 0;
                var TOT_PX_X = 0;
                var TOT_NET_GLOBAL = 0;
                var TOT_PNLT_X = 0;
                var dataRoot = {text: '.', expanded: false, children: []};

                Ext.Object.each(res, function(index, value) {
                    TOT_NET_GLOBAL += parseFloat(value.NET);
                });
                // console.log(TOT_NET_GLOBAL);
                Ext.Object.each(res, function(index, value) {
                    if (a.indexOf(value.ESTADO) < 0) {
                        var x = [];
                        var TOT_NET = 0;
                        var TOT_BN = 0;
                        var TOT_PX = 0;
                        var TOT_PNLT = 0;
                        Ext.Object.each(res, function(index, valuex) {
                            if (value.ESTADO === valuex.ESTADO) {
                                TOT_NET += parseFloat(valuex.NET);
                                TOT_BN += parseInt(valuex.BN);
                                TOT_PX += parseInt(valuex.PAX);
                                TOT_PNLT += parseInt(valuex.PNLT);
                            }
                        });

                        TOT_NET_X += parseFloat(TOT_NET);
                        TOT_PX_X += parseInt(TOT_PX);
                        TOT_BN_X += parseInt(TOT_BN);
                        TOT_PNLT_X += parseInt(TOT_PNLT);

                        a.push(value.ESTADO);
                        dataRoot.children.push({
                            ESTADO: value.ESTADO,
                            DESCRIPTION: value.ESTADO,
                            IS_TOTAL: true,
                            VNR: '',
                            VNR_NAME: '',
                            NET: parseFloat(TOT_NET),
                            NETPOR: ((TOT_NET / TOT_NET_GLOBAL) * 100),
                            BN: parseInt(TOT_BN),
                            PAX: parseInt(TOT_PX),
                            AVG: (parseInt(TOT_BN) > 0 ? (parseFloat(TOT_NET) / parseInt(TOT_BN)) : 0.0),
                            PNLT: parseFloat(TOT_PNLT),
                            expanded: true, children: []
                        });
                        var b = [];
                        Ext.Object.each(res, function(index, value01) {
                            if (value.ESTADO === value01.ESTADO) {
                                b.push(value01.VNR);
                                dataRoot.children[a.indexOf(value.ESTADO)].children.push({
                                    DESCRIPTION: value01.VNR_NAME,
                                    IS_TOTAL: false,
                                    ESTADO: value01.ESTADO,
                                    VNR: value01.VNR,
                                    VNR_NAME: value01.VNR_NAME,
                                    NET: parseFloat(value01.NET),
                                    NETPOR: ((parseFloat(value01.NET) / TOT_NET) * 100),
                                    BN: parseInt(value01.BN),
                                    PAX: parseInt(value01.PAX),
                                    AVG: parseFloat(value01.AVG),
                                    PNLT: parseFloat(value01.PNLT),
                                    leaf: true
                                });
                            }
                        });
                    }
                });
                prototype.id_TOT_NET_ = TOT_NET_X;
                prototype.id_TOT_BN_ = TOT_BN_X;
                prototype.id_TOT_AVG_ = (parseInt(TOT_NET_X) / parseFloat(TOT_BN_X));
                prototype.id_TOT_PNLT_ = TOT_PNLT_X;
                //console.log('crea tree grid ');
                var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
                panel.removeAll();

                var gridPanel = Ext.create({
                    xtype: prototype.id + '-info',
                    id: prototype.id + '-contentInfo',
                    region: 'center',
                    border: false
                });
                var storeTree = Ext.create('Ext.data.TreeStore', {
                    root: dataRoot
                });

                panel.add(gridPanel);
                panel.updateLayout();
                Ext.getCmp(prototype.id + '-gridtree00').setStore(storeTree);
                //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);                
            }
        });

    },
    search01: function() {
        this.page_current = 1;
        //console.log('page: ' + this.page_current);
        //Ext.getCmp(prototype.id + '-boxPaginacion').hide(); 
        var bean = {};
        var fecha = new Date();
        var year = Ext.getCmp(prototype.id + '-cmb-year').getValue();
        year = year === undefined || year === null ? fecha.getFullYear() : year;
        var month = Ext.getCmp(prototype.id + '-cmb-month').getValue();
//        month = month === undefined || month === null ? Ext.String.leftPad(fecha.getMonth() + 1, 2, '0') : month;
         month = month === undefined || month === null ? '' : month;
        
        //beanTMP.option = "QRY_GDS_AUDIT_01";
        bean.VP_DATE = year + '' + month;
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();
        
        bean.limit = "-1";
        bean.page = "-1";
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-ContenedorMain'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: prototype.url + '/search06',
            timeout: 60000000,
            method: 'GET',
            params: bean,
            success: function(response, options) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                res = res.data;
                var a = [];
                var TOT_NET_X = 0;
                var TOT_OVERAGE_X = 0;
                var TOT_BN_X = 0;
                var TOT_PNLT_X = 0;

                var dataRoot = {text: '.', expanded: false, children: []};
                Ext.Object.each(res, function(index, value) {
                    if (a.indexOf(value.GDS) < 0) {

                        var x = [];
                        var TOT_NET = 0;
                        var TOT_OVERAGE = 0;
                        var TOT_BN = 0;
                        var TOT_PNLT = 0;
                        Ext.Object.each(res, function(index, valuex) {
                            if (value.GDS === valuex.GDS) {
                                TOT_NET += parseFloat(valuex.NET);
                                TOT_OVERAGE += parseFloat(valuex.OVERAGE);
                                TOT_BN += parseInt(valuex.BN);
                                TOT_PNLT += parseInt(valuex.PNLT);
                            }
                        });

                        TOT_NET_X += parseFloat(TOT_NET);
                        TOT_OVERAGE_X += parseFloat(TOT_OVERAGE);
                        TOT_BN_X += parseInt(TOT_BN);
                        TOT_PNLT_X += parseFloat(TOT_PNLT);

                        a.push(value.GDS);
                        dataRoot.children.push({
                            FDATE: value.FDATE,
                            DESCRIPTION: value.GDS_NAME,
                            IS_TOTAL: true,
                            GDS: value.GDS,
                            GDS_NAME: value.GDS_NAME,
                            VNR: '',
                            VNR_NAME: '',
                            NET: parseFloat(TOT_NET),
                            OVERAGE: parseFloat(TOT_OVERAGE),
                            BN: parseInt(TOT_BN),
                            AVG: (parseInt(TOT_BN) > 0 ? (parseFloat(TOT_NET) / parseInt(TOT_BN)) : 0.0),
                            PNLT: parseFloat(TOT_PNLT),
                            expanded: false, children: []
                        });
                        var b = [];
                        Ext.Object.each(res, function(index, value01) {
                            if (value.GDS === value01.GDS) {
                                b.push(value01.VNR);
                                dataRoot.children[a.indexOf(value.GDS)].children.push({
                                    FDATE: value01.FDATE,
                                    DESCRIPTION: value01.VNR_NAME,
                                    IS_TOTAL: false,
                                    GDS: value01.GDS,
                                    GDS_NAME: value01.GDS_NAME,
                                    VNR: value01.VNR,
                                    VNR_NAME: value01.VNR_NAME,
                                    NET: parseFloat(value01.NET),
                                    OVERAGE: parseFloat(value01.OVERAGE),
                                    BN: parseInt(value01.BN),
                                    AVG: parseFloat(value01.AVG),
                                    PNLT: parseFloat(value01.PNLT),
                                    leaf: true
                                });
                            }
                        });
                    }
                });
                prototype.id_TOT_NET = TOT_NET_X;
                prototype.id_TOT_OVERAGE = (parseInt(TOT_BN_X) > 0 ? (parseFloat(TOT_NET_X) / parseInt(TOT_BN_X)) : 0.0),
                prototype.id_TOT_BN = TOT_BN_X;
                prototype.id_TOT_PNLT = TOT_PNLT_X;

                // console.log(dataRoot);
                var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
                panel.removeAll();

                var gridPanel = Ext.create({
                    xtype: prototype.id + '-info1',
                    id: prototype.id + '-contentInfo1',
                    region: 'center',
                    border: false
                });
                var storeTree = Ext.create('Ext.data.TreeStore', {
                    root: dataRoot
                });

                panel.add(gridPanel);
                panel.updateLayout();
                Ext.getCmp(prototype.id + '-gridtree01').setStore(storeTree);
            }
        });

    },
    search02: function() {
        this.page_current = 1;
        var bean = {};        
        var year = Ext.getCmp(prototype.id + '-cmb-year').getValue();        
        var month = Ext.getCmp(prototype.id + '-cmb-month').getValue();        
        //bean.option = "QRY_GDS_AUDIT_02";
        bean.VP_DATE = year + '' + month;
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAudit.GridData71', {
            proxy: {
                url: prototype.url + '/search07'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info71',
            id: prototype.id + '-contentInfo71'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData71').setStore(storeGridDatas);
    },
    search03: function() {
        this.page_current = 1;      
        var bean = {};        
        var year = Ext.getCmp(prototype.id + '-cmb-year').getValue();        
        var month = Ext.getCmp(prototype.id + '-cmb-month').getValue();
        
        //bean.option = "QRY_GDS_AUDIT_03";
        bean.VP_DATE = year + '' + month;
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAudit.GridData72', {
            proxy: {
                url: prototype.url + '/search08'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info72',
            id: prototype.id + '-contentInfo72'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData72').setStore(storeGridDatas);
    },
    onDetailClick: function(grid, rowIndex, colIndex) {
        
        this.page_current = 2;        
        //console.log( this.page_current );
        //mostrar paginacion
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        
        if (Ext.getCmp(prototype.id + '-gridtree01')) {
            var grid = Ext.getCmp(prototype.id + '-gridtree01');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);            
            this.gridtree01 = rec;
        }
        //var rec = grid.getStore().getAt(rowIndex);             
        var year = Ext.getCmp(prototype.id + '-cmb-year').getValue();
        var month = Ext.getCmp(prototype.id + '-cmb-month').getValue();
        //console.log(month);        
        if (month !== '')
            month = month === undefined || month === null ? Ext.String.leftPad(fecha.getMonth() + 1, 2, '0') : month;
        //console.log(month);        

        prototype.id_VP_FDATE = year + month; //rec.get('FDATE');
        prototype.id_VP_GDS = this.gridtree01.get('GDS');
        prototype.id_VP_VNR = this.gridtree01.get('VNR');
        var bean = {};
        //bean.option = "QRY_GDS_AUDIT_04";        
        bean.VP_FDATE = prototype.id_VP_FDATE;
        bean.VP_GDS = prototype.id_VP_GDS;
        bean.VP_VNR = prototype.id_VP_VNR;
        bean.VP_COUNTRY = '';
        bean.VP_IATA = '';
        bean.VP_PSEUDOC = '';
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_FLAG_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAudit.GridData61', {
            proxy: {
                url: prototype.url + '/search061'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
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
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info61',
            id: prototype.id + '-contentInfo61'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData61').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onDetailClick01: function(grid, rowIndex, colIndex) {
        this.page_current = 3;        
        //console.log( this.page_current );
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        if (Ext.getCmp(prototype.id + '-gridData61')) {
            var grid = Ext.getCmp(prototype.id + '-gridData61');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);            
            this.gridData61 = rec;
        }
        //var rec = grid.getStore().getAt(rowIndex);
        prototype.id_VP_COUNTRY = this.gridData61.get('COUNTRY');
        var bean = {};
        //bean.option = "QRY_GDS_AUDIT_04";
        bean.VP_FDATE = prototype.id_VP_FDATE;
        bean.VP_GDS = prototype.id_VP_GDS;
        bean.VP_VNR = prototype.id_VP_VNR;
        bean.VP_COUNTRY = prototype.id_VP_COUNTRY;
        bean.VP_IATA = '';
        bean.VP_PSEUDOC = '';        
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_FLAG_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();

        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAudit.GridData62', {
            proxy: {
                url: prototype.url + '/search061'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
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
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info62',
            id: prototype.id + '-contentInfo62'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData62').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onDetailClick02: function(grid, rowIndex, colIndex) {
        this.page_current = 4;        
//        console.log( this.page_current );
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        if (Ext.getCmp(prototype.id + '-gridData62')) {
            var grid = Ext.getCmp(prototype.id + '-gridData62');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);            
            this.gridData62 = rec;
        }
        //var rec = grid.getStore().getAt(rowIndex);
        prototype.id_IATA = this.gridData62.get('IATA');
        prototype.id_PSEUDOC = this.gridData62.get('PSEUDOC');
        var bean = {};
        //beanTMP.option = "QRY_GDS_AUDIT_04";
        bean.VP_FDATE = prototype.id_VP_FDATE;
        bean.VP_GDS = prototype.id_VP_GDS;
        bean.VP_VNR = prototype.id_VP_VNR;
        bean.VP_COUNTRY = prototype.id_VP_COUNTRY;
        bean.VP_IATA = prototype.id_IATA;
        bean.VP_PSEUDOC = prototype.id_PSEUDOC;
        bean.VP_UNPRO = Ext.getCmp(prototype.id + '-chk-prodimp').getValue() ? '1' : '';
        bean.VP_FLAG_IATA = Ext.getCmp(prototype.id + '-rbtn-iata').getValue();

        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GdsAudit.GridData63', {
            proxy: {
                url: prototype.url + '/search061'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
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
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info63',
            id: prototype.id + '-contentInfo63'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData63').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    onLoadComboType: function() {
        var cmb = Ext.getCmp(prototype.id + '-cmb-type');
        var store = cmb.getStore();
        var data = [
            {'code': '00', 'description': 'GDS'},
            {'code': '01', 'description': 'GDS x Month'},
            {'code': '02', 'description': 'Country'},
            {'code': '03', 'description': 'IATA'}
        ];
        store.loadData(data);
        cmb.setValue('00');
    },
    onCmbYearAfterRender: function(obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbYearMonthRender: function(obj) {
        var fecha = new Date();
        obj.setValue(Ext.String.leftPad(fecha.getMonth() + 1, 2, '0'));
    },
    onCmbYearMonthRender_: function(obj) {
        obj.setValue('');
    },
    onDetailIsDisabled: function(view, rowindex, colIndex, item, record) {
        // console.log(record.get('FDATE')+'-'+record.get('GDS')+'-'+record.get('VNR'));
        var status = false;
        if (record.get('VNR') === '') {
            status = true;
        }
        return status;
    },
    onChangeUnproductive: function(obj, newValue, oldValue, eOpts) {
        this.Onsearch();
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">

    // </editor-fold>
});

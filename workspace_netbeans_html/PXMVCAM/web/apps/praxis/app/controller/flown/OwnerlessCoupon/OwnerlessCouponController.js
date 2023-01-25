/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.OwnerlessCoupon.OwnerlessCouponController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OwnerlessCouponController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    ticketNumber: '',
    optionCheck: '',
    me: '',
    bean: '',
    gridActual: '',
    type: '',
    searchParams: {},
    searchParams_load: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'OwnerlessCouponForm';
        prototype.id2 = 'OwnerlessCouponForm2';
        prototype.url = CONTEXTPATH + '/OwnerlessCoupon';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#OwnerlessCouponForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#OwnerlessCouponForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#OwnerlessCouponForm-btnClear': {
                click: this.btnClear_click
            },
            '#OwnerlessCouponForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#OwnerlessCouponForm-btnAddFavorite': {
                click: this.btnAddFavorite_click
            },
            '#OwnerlessCouponForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#OwnerlessCouponForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#OwnerlessCouponForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#OwnerlessCouponForm-btn-pag-next': {
                click: this.pagNext
            },
            '#OwnerlessCouponForm-btn-pag-last': {
                click: this.pagLast
            },
//            '#OwnerlessCouponForm-btnProcess': {
//                click: this.btnProcess_click
//            },
            '#OwnerlessCouponForm-btnFilter': {
                click: this.btnProcess_click
            },

            //-----------------Eventos Especificos -------------------
            '#OwnerlessCouponForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#OwnerlessCouponForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#OwnerlessCouponForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#OwnerlessCouponForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#OwnerlessCouponForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#OwnerlessCouponForm-textTicket': {
                keyup: this.eventKey,
                change: this.onValidarChange
            },
            '#OwnerlessCouponForm-differentCarrier': {
                change: this.checkEvent
            },
            '#OwnerlessCouponForm-canceledFlight': {
                change: this.checkEvent_canceledFlight
            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.optionCheck = 0;
        this.btnSearch_click();


    },
    onValidarChange: function(obj) {
        var list = obj.getValue().replace(/\s/g, "").split("");
        var txtTKT = '';
        for (var i = 0; i < list.length; i++) {
            if (list[i].toLowerCase() === list[i].toUpperCase()) {
                txtTKT += list[i];
            }
        }
        obj.setValue(txtTKT.substring(0, 13));
    },
    // ---------- Eventos de consistencia de los combos---------------
    checkEvent: function(obj, e) {
        //true : check ; false : uncheck
        console.log('checkEvent')
        if (obj.getValue()) {
            this.optionCheck = 1;
            Ext.getCmp(prototype.id + '-textTicket').setValue('');
            Ext.getCmp(prototype.id + '-canceledFlight').setValue(0);
        } else {
            this.optionCheck = 0;
        }
        this.btnSearch_click();

    },
    checkEvent_canceledFlight: function(obj, e) {
        //true : check ; false : uncheck
        console.log('checkEvent_canceledFlight')
        if (obj.getValue()) {            
            this.optionCheck = 2;
            Ext.getCmp(prototype.id + '-differentCarrier').setValue(0);
            Ext.getCmp(prototype.id + '-textTicket').setValue('');
        } else {
            this.optionCheck = 0;
        }
        this.btnSearch_click();

    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        //obj.setValue('0' + (this.fecha.getMonth() + 1));
        obj.setValue('');
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());

    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');


        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function(obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["P", "Pending"],
                ["F", "Extraido al Flown"], //Loaded
                ["D", "Duplicate"],
                ["C", "Cancelled"]
            ]
        }));
        cmbStatus.setValue("P");

    },
    btnSearch_click: function(obj, e) {
        var ticketNumber = Ext.getCmp(prototype.id + '-textTicket');
        this.setFormatParameter();

        if (ticketNumber.getValue().length > '0') { //Si hay un numero de ticket la busqueda debe ser por el numero de ticket, asi este el check activo
            if (ticketNumber.getValue().length < '13') {
                global.Msg({
                    msg: "Ticket number must contain 13 digits.",
                    icon: 1,
                    fn: function() {
                        Ext.getCmp(prototype.id + '-textTicket').focus(true);
                    }
                });
            } else {
                Ext.getCmp(prototype.id + '-differentCarrier').setValue(0);
                Ext.getCmp(prototype.id + '-canceledFlight').setValue(0);
                Ext.getCmp(prototype.id + '-gridData').show();
                Ext.getCmp(prototype.id + '-gridData2').hide();
                Ext.getCmp(prototype.id + '-gridData3').hide();
                gridActual = prototype.id + '-gridData';
                this.setGridData(obj, e);
            }
        } else {    //La consultad dependera del estado del checkbox
            if (Ext.getCmp(prototype.id + '-differentCarrier').getValue() && !Ext.getCmp(prototype.id + '-canceledFlight').getValue()) {
             //Realizar la consulta por Carrier
             Ext.getCmp(prototype.id + '-gridData2').show();
             Ext.getCmp(prototype.id + '-gridData').hide();
             Ext.getCmp(prototype.id + '-gridData3').hide();
             gridActual = prototype.id + '-gridData2';
             //Ext.getCmp(prototype.id + '-canceledFlight').setValue(0);
             this.setGridData2(obj, e);
             
             } else if (!Ext.getCmp(prototype.id + '-differentCarrier').getValue() && Ext.getCmp(prototype.id + '-canceledFlight').getValue()) {
             //Realizar la consulta por Vuelo Cancelado
             Ext.getCmp(prototype.id + '-gridData3').show();
             Ext.getCmp(prototype.id + '-gridData2').hide();
             Ext.getCmp(prototype.id + '-gridData').hide();
             gridActual = prototype.id + '-gridData3';
             //Ext.getCmp(prototype.id + '-differentCarrier').setValue(0);
             this.setGridData3(obj, e);
             
             } else {
             //Realizar la consulta principal
             Ext.getCmp(prototype.id + '-gridData').show();
             Ext.getCmp(prototype.id + '-gridData2').hide();
             Ext.getCmp(prototype.id + '-gridData3').hide();
             gridActual = prototype.id + '-gridData';
             this.setGridData(obj, e);
             }

        }
    },
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var txtNVLO = Ext.getCmp(prototype.id + '-txtNVLO');
        var ticketNumber = Ext.getCmp(prototype.id + '-textTicket');
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');

        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }

        this.dateFrom = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        this.dateTo = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        this.ticketNumber = ticketNumber.getValue();
        this.cmbStatus = cmbStatus.getValue();
        this.txtNVLO = txtNVLO.getValue();

        searchParams = {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            ticketNumber: this.ticketNumber,
            txtNVLO: this.txtNVLO,
            cmbStatus: this.cmbStatus,
            option: this.optionCheck
        };

        console.log("DateFrom : " + this.dateFrom);
        console.log("DateTo : " + this.dateTo);
        console.log("ticketNumber : " + this.ticketNumber);
        console.log("txtNVLO : " + this.txtNVLO);
        console.log("cmbStatus : " + this.cmbStatus);
        console.log("option : " + this.optionCheck);

    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.OwnerlessCoupon.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridData2: function(obj, val) {
        this.setFormatParameter();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.OwnerlessCoupon.GridData2', {
            proxy: {
                url: prototype.url + '/searchCarrier'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridData3: function(obj, val) {
        this.setFormatParameter();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.OwnerlessCoupon.GridData2', {
            proxy: {
                url: prototype.url + '/searchCanceled'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData3').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData3').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var ticketNumber = Ext.getCmp(prototype.id + '-textTicket');
        var txtNVLO = Ext.getCmp(prototype.id + '-txtNVLO');

        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        dayFrom.setValue("");
        dayTo.setValue("");
        ticketNumber.setValue("");
        txtNVLO.setValue("");
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
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        console.log(gridActual);
        this.setFormatParameter();
        if (gridActual === prototype.id + '-gridData') {
            global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.dateFrom + '&dateTo=' + searchParams.dateTo + '&ticketNumber=' + searchParams.ticketNumber
                + '&txtNVLO=' + searchParams.txtNVLO + '&cmbStatus=' + searchParams.cmbStatus + '&option=' + searchParams.option);
        } else if (gridActual === prototype.id + '-gridData2') {
            global.getFile(prototype.url + '/getXLSXCarrier?dateFrom=' + searchParams.dateFrom + '&dateTo=' + searchParams.dateTo);
        } else if (gridActual === prototype.id + '-gridData3') {
            global.getFile(prototype.url + '/getXLSXCanceled?dateFrom=' + searchParams.dateFrom + '&dateTo=' + searchParams.dateTo + '&txtNVLO=' + searchParams.txtNVLO);
        }
        
    },
    btnProcess_click: function(obj) {
        
        var option = Ext.getCmp(prototype.id + '-boxProcess');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnAddFavorite_click: function(obj, e) {

        var btn = Ext.getCmp(prototype.id + '-btnAddFavorite');
        console.log(" ---> " + btn.icon);

        if (btn.icon === 'resources/img/botones/16x16/addFav.png') {
            btn.setIcon('resources/img/botones/16x16/delFav.png');
            btn.setTooltip('Delete Favorite');


            global.Msg({
                msg: 'Menu is added to favorite'
            });
        } else {
            btn.setIcon('resources/img/botones/16x16/addFav.png');
            btn.setTooltip('Add Favorite');
            global.Msg({
                msg: 'Menu is Removed to favorite'
            });
        }

    },
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    
    
    /**
     * Metodos usados para editar
     **/
    
    onEditClick: function(grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);

    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        if (Ext.getCmp(prototype.id + '-differentCarrier').getValue()) {
            console.log("DataEntry 2");
            Ext.create('Ext.Praxis.view.flown.OwnerlessCouponForm.DataEntry2', {
                id: prototype.id + '-dataEntry2',
                params: {
                    action: action,
                    rec: rec,
                    all: all,
                    rowIndex: rowIndex
                }
            }).show();
        } else {
            console.log("DataEntry 1");
            Ext.create('Ext.Praxis.view.flown.OwnerlessCouponForm.DataEntry', {
                id: prototype.id + '-dataEntry',
                params: {
                    action: action,
                    rec: rec,
                    all: all,
                    rowIndex: rowIndex
                }
            }).show();
        }

    },
    
    setFormatParameter_load: function() {
        
        me.bean = {};
        me.bean.A1413FVLOB = Ext.getCmp(prototype.id + '-txtA1413FVLOB').getValue();
        me.bean.A1413NVLOB = Ext.getCmp(prototype.id + '-txtA1413NVLOB').getValue();
        me.bean.A1413FROM = Ext.getCmp(prototype.id + '-txtA1413FROM').getValue();
        me.bean.A1413TO = Ext.getCmp(prototype.id + '-txtA1413TO').getValue();
                
        var beanString = JSON.stringify(me.bean);
        searchParams_load = {
            bean: me.bean,
            beanString: beanString
        };
        
    },
    
    onLoadA1413: function(parm_t, b , c , d, e, f) {
        
        this.setFormatParameter_load();

        me.type = parm_t;
        Ext.Ajax.request({
            url: prototype.url + '/load_A1413',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: searchParams_load.beanString, type: me.type},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                
                if (res.success) {
                    if(me.type === '1'){
                        Ext.Msg.show({
                            title: '.: PRAXIS :.',
                            msg: res.bean.strDescripcion + ' Are you sure to load ?',
                            buttons: Ext.MessageBox.YESNO,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'yes') {
                                    me.onLoadA1413('2')
                                }
                            }
                        });
                    }else if(me.type === '2'){
                        global.Msg({msg: res.bean.strDescripcion, icon: 1});
                    }
                }else {
                    global.Msg({msg: "Error load " + me.type , icon: 0});
                }
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                console.log('server-side failure with status code ' + response.status);                        
            }
        });
                

    },
    
    
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});

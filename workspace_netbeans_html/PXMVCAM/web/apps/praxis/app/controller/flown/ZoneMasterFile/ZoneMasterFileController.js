/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Ext, gloContextPath, gloServerDate, gloServerTime, global, win */

Ext.define('Ext.Praxis.controller.flown.ZoneMasterFile.ZoneMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ZoneMasterFileController',
    url: CONTEXTPATH + '/ZoneMasterFile',
    contentPanel: 1300,
    hiddenFilter: true,
    vp_gridTransactions_rowIndex: -1,
    me: '',
    searchParams: {},
    beanTMP: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        console.log('1)  APPLICATION ZONE MASTER FILE - CONTROLLER ZONE MASTER FILE - INIT');
        me = this;
        this.control({
            '#vZoneMasterFile-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#vZoneMasterFile-cbmFilterType': {
                select: this.cbmFilterType_select
            },
            '#vZoneMasterFile-btnSearch': {
                click: this.btnSearch_click
            },
            '#vZoneMasterFile-btnClear': {
                click: this.btnClear_click
            },
            '#vZoneMasterFile-btnExcel': {
                click: this.btnExcel_click
            },
            '#vZoneMasterFile-btnFilter': {
                click: this.btnFilter_click
            },
            '#vZoneMasterFile-btnAdd': {
                click: this.btnAdd_click
            },
//            '#vZoneMasterFile-btnBack': {
//               // click: this.btnBack_click
//            },
            '#vZoneMasterFile-btn-pag-first': {
                click: this.pagFirst
            },
            '#vZoneMasterFile-chkEmpty': {
                change: this.btnSearch_click
            }

        });


        Ext.ComponentQuery.query('#vZoneMasterFile-btn-pag-previous')[0].on('click', function(obj) {
            me.getInfoPag(obj, 'previous');
        });

        Ext.ComponentQuery.query('#vZoneMasterFile-btn-pag-next')[0].on('click', function(obj) {
            me.getInfoPag(obj, 'next');
        });

        Ext.ComponentQuery.query('#vZoneMasterFile-btn-pag-last')[0].on('click', function(obj) {
            me.getInfoPag(obj, 'last');
        });
    },
    pagFirst: function() {
        var pag = Ext.getCmp('vZoneMasterFile-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    getSearchParams: function(val) {
        var chek = Ext.getCmp('vZoneMasterFile-chkEmpty').getValue();
        var strValor = '';
        if (chek) {
            strValor = '1';
        } else {
            strValor = '2';
        }
        var searchType = Ext.getCmp('vZoneMasterFile-cbmFilterType').getValue();
        var origin;
        switch (val) {
            case 1:
                origin = Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').getValue();
                break;
            case 2:
                origin = Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').getValue();
                break;
        }
        var destination = Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').getValue();
        var ZONA = Ext.getCmp('vZoneMasterFile-cmbZone').getValue();

        searchParams = {
            searchType: searchType,
            origin: origin,
            destination: destination,
            ZONA: ZONA,
            strValor: strValor
        };
    }
    ,
    xpanel_afterrender: function(obj, e) {

        var cmbZone = Ext.getCmp('vZoneMasterFile-cmbZone');
        cmbZone.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AFR", 'AFR - AFRICA'],
                ["ASI", "ASI - ASIA"],
                ["CAN", "CAN - CANADA"],
                ["CAM", "CAM - CENTROAMERICA"],
                ["CAR", "CAR - CARIBE"],
                ["EUR", "EUR - EUROPA"],
                ["FRO", "FRO - FRONTERA"],
                ["LOC", "LOC - LOCAL"],
                ["OCE", "OCE - OCEANIA"],
                ["PLA", "PLA - PLAYA"],
                ["SUD", "SUD - SUDAMERICA"],
                ["USA", "USA - ESTADOS UNIDOS"]
            ]
        }));
        cmbZone.setValue("");



        Ext.Ajax.request({
            url: this.url + '/getCities',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.data;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').bindStore(storeData);
                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').bindStore(storeData);
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').bindStore(storeData);

                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setValue("");
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setValue("");
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').setValue("");
                global.clear();
                me.setGridData(obj, 1);
                me.btnSearch_click();
            }
        });

//        var storeComboDatas = Ext.create('Ext.Praxis.store.flown.ZoneMasterFile.FilterBys02', {
//            proxy: {
//                url: this.url + '/getCities'
//            }
//        });
//        Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').bindStore(storeComboDatas);
//        Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').bindStore(storeComboDatas);
//        Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').bindStore(storeComboDatas);


        //Creamos un store para el gridData by Airport
//        this.setGridData(obj, 1);
//        this.btnSearch_click();
    },
    setGridData: function(obj, val) {

        this.getSearchParams(val);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ZoneMasterFile.GridData', {
            proxy: {
                url: this.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp('vZoneMasterFile-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp('vZoneMasterFile-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp('vZoneMasterFile-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp('vZoneMasterFile-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }

                    global.clear();
                }
            }
        });
        Ext.getCmp('ZoneMasterFile-gridDataAirport').bindStore(storeGridDatas);
        Ext.getCmp('vZoneMasterFile-paggin').bindStore(storeGridDatas);
    },
    setGridData2: function(obj, val) {

        this.getSearchParams(val);
        var storeGridDatas2 = Ext.create('Ext.Praxis.store.flown.ZoneMasterFile.GridDataCityPair', {
            proxy: {
                url: this.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp('vZoneMasterFile-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp('vZoneMasterFile-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp('vZoneMasterFile-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp('vZoneMasterFile-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp('ZoneMasterFile-gridDataCityPair').bindStore(storeGridDatas2);
        // Ext.getCmp('vZoneMasterFile-paggin').bindStore(storeGridDatas2);
    },
    setGridData3: function(obj, val) {

        this.getSearchParams(val);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ZoneMasterFile.GridData', {
            proxy: {
                url: this.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp('vZoneMasterFile-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp('vZoneMasterFile-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp('vZoneMasterFile-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp('vZoneMasterFile-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }

                    global.clear();
                }
            }
        });
        Ext.getCmp('ZoneMasterFile-gridDataZone').bindStore(storeGridDatas);
        Ext.getCmp('vZoneMasterFile-paggin').bindStore(storeGridDatas);
    },
    //Controla la paginacion de los botones atraves de la interfaz del componente paggin del EXT
    getInfoPag: function(obj, action) {

        var pag = Ext.getCmp('vZoneMasterFile-paggin');
        var pagData = pag.getPageData();

        switch (action) {
            case 'first':
                pag.moveFirst();
                break;
            case 'previous':
                pag.movePrevious();
                break;
            case 'next':
                pag.moveNext();
                break;
            case 'last':
                pag.moveLast();
                break;
        }
        Ext.getCmp('vZoneMasterFile-lbl-currentPage').setText(pagData.currentPage);
        Ext.getCmp('vZoneMasterFile-lbl-pageCount').setText(pagData.pageCount);
        Ext.getCmp('vZoneMasterFile-lbl-total').setText(pagData.total);
    }
    ,
    cbmFilterType_select: function(obj, record, eOpts) {
        var code = obj.getValue();

        switch (code) {
            case '1':
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').setVisible(true);
                Ext.getCmp('vZoneMasterFile-chkEmpty').setVisible(true);
                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataAirport').setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataCityPair').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(false);
                Ext.getCmp('ZoneMasterFile-pie').setVisible(true);
                break;

            case '2':
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').setVisible(false);
                Ext.getCmp('vZoneMasterFile-chkEmpty').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataAirport').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataCityPair').setVisible(true);
                Ext.getCmp('ZoneMasterFile-pie').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(false);
                break;
            case '3':
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(true);
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').setVisible(false);
                Ext.getCmp('vZoneMasterFile-chkEmpty').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataAirport').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataCityPair').setVisible(false);
                Ext.getCmp('ZoneMasterFile-pie').setVisible(true);
                this.btnSearch_click();
                break;
        }
        //this.btnSearch_click(obj);

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
        var searchType = Ext.getCmp('vZoneMasterFile-cbmFilterType').getValue();
        var chek = Ext.getCmp('vZoneMasterFile-chkEmpty').getValue();
        var origin = '';
        var strValor = '';
        var url = '';
        var ZONA = Ext.getCmp('vZoneMasterFile-cmbZone').getValue();
        if (chek) {
            strValor = '1';
        } else {
            strValor = '2';
        }
        switch (searchType) {
            case '1':
                origin = Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').getValue();
                url = 'getXLSX';
                break;
            case '2':
                origin = Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').getValue();
                url = 'getXLSX2';
                break;
            case '3':
                url = 'getXLSX3';
                break;
        }
        var destination = Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').getValue();
        global.getFile(this.url + '/' + url + '?origin=' + origin + '&destination=' + destination + '&searchType=' + searchType + '&strValor=' + strValor + '&ZONA=' + ZONA);
    }

    ,
    btnClear_click: function(obj, e) {

        var cmbFilterType = Ext.getCmp('vZoneMasterFile-cbmFilterType');
        var cmbAirportCode = Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode');
        var cmbFilterOrigin = Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setValue("");
        var cmbFilterDestination = Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setValue("");
        var gridCityPair = Ext.getCmp('ZoneMasterFile-gridDataCityPair');
        var gridAirport = Ext.getCmp('ZoneMasterFile-gridDataAirport');

        cmbFilterType.setValue(1);
        cmbAirportCode.setValue("");
        cmbFilterOrigin.setValue("");
        cmbFilterDestination.setValue("");
        gridCityPair.getStore().removeAll();
        Ext.getCmp('ZoneMasterFile-pie').setVisible(true);



        switch (cmbFilterType.getValue()) {
            case '1':
                cmbAirportCode.setVisible(true);
                cmbFilterOrigin.setVisible(false);
                cmbFilterDestination.setVisible(false);
                gridCityPair.setVisible(false);
                gridAirport.setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(false);

                break;

            case '2':
                cmbAirportCode.setVisible(false);
                cmbFilterOrigin.setVisible(true);
                cmbFilterDestination.setVisible(true);
                gridCityPair.setVisible(true);
                gridAirport.setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(false);
                break;
            case '3':
                Ext.getCmp('vZoneMasterFile-cmbZone').setVisible(true);
                Ext.getCmp('vZoneMasterFile-cmbFilterAirportCode').setVisible(false);
                Ext.getCmp('vZoneMasterFile-chkEmpty').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').setVisible(false);
                Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataZone').setVisible(true);
                Ext.getCmp('ZoneMasterFile-gridDataAirport').setVisible(false);
                Ext.getCmp('ZoneMasterFile-gridDataCityPair').setVisible(false);
                Ext.getCmp('ZoneMasterFile-pie').setVisible(true);
                break;
        }
        this.btnSearch_click();

    },
    btnSearch_click: function(obj, e) {

        //Se busca todos los componentes tipo form dentro de la vista vZoneMasterFile-contentFilter,y luego se obtiene el primer elemento devuelto
        var vFormFilter = Ext.ComponentQuery.query('[id=vZoneMasterFile-contentFilter] > form')[0];

        if (vFormFilter.isValid()) {
            var option = Ext.getCmp('vZoneMasterFile-cbmFilterType').getValue();
            switch (option) {
                case '1':
                    this.setGridData(obj, 1);
                    break;
                case '2':
                    var airport = Ext.getCmp('vZoneMasterFile-cmbFilterOriginCity').getValue();
                    var zone = Ext.getCmp('vZoneMasterFile-cmbFilterDestinationCity').getValue();


                    if ((airport === null || airport === '') && (airport === null || airport === '')) {
                        global.Msg({
                            msg: 'Please select origin and destination.'
                        });
                        return false;
                    } else {
                        this.setGridData2(obj, 2);
                    }

                    break;
                case '3':
                    this.setGridData3(obj, 1);
                    break;
            }


        } else {
            Ext.Msg.alert('Message', 'Enter the required fields correctly.');
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp('vZoneMasterFile-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnAdd_click: function(obj) {
        this.winDataEntry('I');
    },
    btnBack_click: function(obj) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.ZoneMasterFileForm.DataEntry', {
            id: 'vZoneMasterFile-dataEntry-win',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    }

});
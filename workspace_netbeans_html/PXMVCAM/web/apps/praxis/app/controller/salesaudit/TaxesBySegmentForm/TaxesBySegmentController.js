/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.TaxesBySegmentForm.TaxesBySegmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesBySegmentController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsTTBS: {},
    lstAirport: {},
    lstAirportDep: {},
    lstAirportArr: {},
    init: function(view) {
        prototype.id = 'TaxesBySegmentForm';
        prototype.url = CONTEXTPATH + '/TaxesBySegment';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TaxesBySegmentForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            //--------------------Eventos Especificos ------------------
            '#TaxesBySegmentForm-cmbPais': {
                change: this.changeCmbPais
            },
            '#TaxesBySegmentForm-cmbPaisArr': {
                change: this.changeCmbPaisArr
            },
            '#TaxesBySegmentForm-cmbAirport': {
                change: this.changeCmbAirport
            },
            '#TaxesBySegmentForm-cmbAirportArr': {
                change: this.changeCmbAirportArr
            },
            '#TaxesBySegmentForm-gridDeparture': {
                itemclick: this.itemclick_departure
            },
            '#TaxesBySegmentForm-gridArrival': {
                itemclick: this.itemclick_arrival
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
    },
    setStoreData: function() {
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(win.getStoreMonth(false));

        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue(this.fecha.getMonth());
        
        this.getListCountry();
        this.getListAirport('MX');
    },
    getListCountry: function() {
        Ext.Ajax.request({
            url: CONTEXTPATH + '/DeterminationOfCommission/getListCountry',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaPaises = res.listaPaises;
                    var country = new Array();
                    var countryDesc = new Array();
                    listaPaises.forEach(function callback(currentValue, index, array) {
                        country.push([currentValue.A051KEY2, currentValue.A051KEY2]);
                    });
                    listaPaises.forEach(function callback(currentValue, index, array) {
                        countryDesc.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                    });
                    var storeDesc = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'countryDesc', autoLoad: true, data: countryDesc, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbPais').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbPais').setValue('MX');
                    Ext.getCmp(prototype.id + '-cmbPaisName').bindStore(storeDesc);
                    Ext.getCmp(prototype.id + '-cmbPaisName').setValue('MX');
                    Ext.getCmp(prototype.id + '-cmbPaisArr').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbPaisArr').setValue('MX');
                    Ext.getCmp(prototype.id + '-cmbPaisNameArr').bindStore(storeDesc);
                    Ext.getCmp(prototype.id + '-cmbPaisNameArr').setValue('MX');
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    getListAirport: function(country) {
        searchParams = {
            VP_COUNTRY: country
        };
        Ext.Ajax.request({
            url: CONTEXTPATH + '/TaxesByCode/loadAirport',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp(prototype.id + '-form').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                lstAirport = res.lstData;
                lstAirportDep = lstAirport;
                lstAirportArr = lstAirport;
                var airport = new Array();
                lstAirport.forEach(function callback(currentValue, index, array) {
                    airport.push([currentValue.A1224ORG, currentValue.A1224ORG]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airport', autoLoad: true, data: airport, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAirport').bindStore(store);
                Ext.getCmp(prototype.id + '-cmbAirportArr').bindStore(store);
                //Ext.getCmp(prototype.id + '-cmbAirport').setValue('MEX');
                Ext.getCmp(prototype.id + '-form').unmask('Loading...', '');
            }
        });
    },
    getListAirportSegment: function(country,obj) {
        searchParams = {
            VP_COUNTRY: country
        };
        Ext.Ajax.request({
            url: CONTEXTPATH + '/TaxesByCode/loadAirport',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp(prototype.id + '-form').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                lstAirport = res.lstData;
                var airport = new Array();
                lstAirport.forEach(function callback(currentValue, index, array) {
                    airport.push([currentValue.A1224ORG, currentValue.A1224ORG]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airport', autoLoad: true, data: airport, fields: ['code', 'name']
                });
                if(obj.id==='TaxesBySegmentForm-cmbPais'){
                    Ext.getCmp(prototype.id + '-cmbAirport').bindStore(store);
                    lstAirportDep = lstAirport;
                }else{ // TaxesBySegmentForm-cmbPaisArr
                    Ext.getCmp(prototype.id + '-cmbAirportArr').bindStore(store);
                    lstAirportArr = lstAirport;
                }
                Ext.getCmp(prototype.id + '-form').unmask('Loading...', '');
            }
        });
    },
    changeCmbPais: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbPaisName').setValue(obj.getValue());
        this.getListAirportSegment(obj.getValue(),obj);
        Ext.getCmp(prototype.id + '-txtAirportName').setValue('');
        Ext.getCmp(prototype.id + '-gridDeparture').getStore().removeAll();
    },
    changeCmbPaisArr: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbPaisNameArr').setValue(obj.getValue());
        this.getListAirportSegment(obj.getValue(),obj);
        Ext.getCmp(prototype.id + '-txtAirportNameArr').setValue('');
        Ext.getCmp(prototype.id + '-gridArrival').getStore().removeAll();
    },
    changeCmbAirport: function(obj) {
        var v = obj.getValue();
        var record = obj.findRecord(obj.valueField || obj.displayField, v);
        var index = obj.store.indexOf(record);
        if(index>=0){
            Ext.getCmp(prototype.id + '-txtAirportName').setValue(lstAirportDep[index].A1007NOMBR);
            var country = Ext.getCmp(prototype.id + '-cmbPais').getValue();
            searchParams = {
                VP_COUNTRY: country,
                VP_AIRPORT: obj.getValue()
            };
            Ext.Ajax.request({
                url: CONTEXTPATH + '/TaxesByCode/loadSegment',
                method: 'POST',
                timeout: 60000000,
                params: searchParams,
                beforerequest: Ext.getCmp(prototype.id + '-form').mask('Loading...', ''),
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var lstDeparture = res.lstData;
                    var storeDeparture = Ext.create('Ext.data.Store', {
                        data: lstDeparture,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDeparture').bindStore(storeDeparture);
                    Ext.getCmp(prototype.id + '-form').unmask('Loading...', '');
                }
            });
        }
    },
    changeCmbAirportArr: function(obj) {
        var v = obj.getValue();
        var record = obj.findRecord(obj.valueField || obj.displayField, v);
        var index = obj.store.indexOf(record);
        if(index>=0){
            Ext.getCmp(prototype.id + '-txtAirportNameArr').setValue(lstAirportArr[index].A1007NOMBR);
            var country = Ext.getCmp(prototype.id + '-cmbPais').getValue();
            searchParams = {
                VP_COUNTRY: country,
                VP_AIRPORT: obj.getValue()
            };
            Ext.Ajax.request({
                url: CONTEXTPATH + '/TaxesByCode/loadSegment_a',
                method: 'POST',
                timeout: 60000000,
                params: searchParams,
                beforerequest: Ext.getCmp(prototype.id + '-form').mask('Loading...', ''),
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var lstArrival = res.lstData;
                    var storeArrival = Ext.create('Ext.data.Store', {
                        data: lstArrival,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridArrival').bindStore(storeArrival);
                    Ext.getCmp(prototype.id + '-form').unmask('Loading...', '');
                }
            });
        }
    },
    itemclick_departure: function(view, record, item, index, e) {
        paramsTTBS = {
            p_country: Ext.getCmp(prototype.id + '-cmbPais').getValue(),
            p_airport: Ext.getCmp(prototype.id + '-cmbAirport').getValue(),
            p_taxcode: record.data.A1202CODTA,
            p_idtax: record.data.A1202IDTAX,
            p_year: Ext.getCmp(prototype.id + '-cmbDateYear').getValue(),
            p_month: Ext.getCmp(prototype.id + '-cmbDateMonth').getValue()
        };
        prototype.idCtrlTaxesByCode = prototype.id + 'compTaxesByCode';
        var viewTaxesByCode = Ext.create('Ext.Praxis.view.salesaudit.TaxesBySegmentForm.CtrlTaxesByCodeForm', {
            id: prototype.id + '-widget-ttbswin',
            params: paramsTTBS
        });
        viewTaxesByCode.show();
    },
    itemclick_arrival: function(view, record, item, index, e) {
        
    }
});
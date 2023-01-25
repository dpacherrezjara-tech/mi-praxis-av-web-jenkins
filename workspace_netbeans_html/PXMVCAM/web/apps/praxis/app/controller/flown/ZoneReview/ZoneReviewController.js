/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ZoneReview.ZoneReviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ZoneReviewController',
    fecha: new Date(),
    me: '',
    urlRequest: '',
    searchParams: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        anioAnterior2 = '2017';
        prototype.id = 'ZoneReviewForm';
        prototype.url = CONTEXTPATH + '/ZoneReview';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ZoneReviewForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ZoneReviewForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ZoneReviewForm-btnClear': {
                click: this.btnClear_click
            },
            '#ZoneReviewForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ZoneReviewForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ZoneReviewForm-btnBack': {
                click: this.btnBack_click
            }
            //-----------------Eventos Especificos -------------------
            ,
            '#ZoneReviewForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#ZoneReviewForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#ZoneReviewForm-chkOAL': {
                change: this.checkEvent
            },
            '#ZoneReviewForm-rbgPRINC': {
                change: this.selectRbgPRINC
            },
            '#ZoneReviewForm-rbgSELEC': {
                change: this.selectRbgSELEC
            },
            '#ZoneReviewForm-rbgSelfare': {
                change: this.selectRgbSelfare
            },
            '#ZoneReviewForm-rbgSelCity': {
                change: this.selectRgbSelCity
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.hidePanelsGridData();
        this.hidePanelFilter();
        this.setStoreData();
        Ext.getCmp(prototype.id + '-contentInfo').show();
        Ext.getCmp(prototype.id + '-contentInfoOAL').hide();
        Ext.getCmp(prototype.id + '-cmbCountry').hide();
    },
    hidePanelFilter: function() {
        Ext.getCmp(prototype.id + '-panelSelectFli').hide();
        Ext.getCmp(prototype.id + '-panelSelectFARE').hide();
        Ext.getCmp(prototype.id + '-panelSelectCITY').hide();
    },
    showPanelFilters: function(option, check) {
        switch (option) {
            case 'btnFLI':
                this.hidePanelFilter();
                break;

            case 'btnFARE':
                this.hidePanelFilter();
                Ext.getCmp(prototype.id + '-panelSelectFARE').show();
                break;

            case 'btnHOUR':
                this.hidePanelFilter();
                break;

            case 'btnPAXFLI':
                this.hidePanelFilter();
                Ext.getCmp(prototype.id + '-panelSelectFli').show();

                if (check) {
                    Ext.getCmp(prototype.id + '-rbgSELEC-item').hide();
                } else {
                    Ext.getCmp(prototype.id + '-rbgSELEC-item').show();
                }
                break;

            case 'btnCITY':
                this.hidePanelFilter();
                break;
            case 'btnCITYday':
                this.hidePanelFilter();
                Ext.getCmp(prototype.id + '-panelSelectCITY').show();
                if (check) {
                    Ext.getCmp(prototype.id + '-rbgSelCity-item').hide();
                } else {
                    Ext.getCmp(prototype.id + '-rbgSelCity-item').show();
                }
                break;
        }
    },
    selectRbgPRINC: function(obj, opt, d) {
        var option = opt.rb;
        var check = Ext.getCmp(prototype.id + '-chkOAL').getValue();
        this.showPanelFilters(option, check);
        this.btnSearch_click();
    },
    selectRbgSELEC: function(obj, opt, d) {
        this.btnSearch_click();
    },
    selectRgbSelfare: function(obj, opt, d) {
        this.btnSearch_click();
    },
    selectRgbSelCity: function(obj, opt, d) {
        this.btnSearch_click();
    },
    checkEvent: function(obj, check) {

        var option = Ext.getCmp(prototype.id + '-rbgPRINC').lastValue.rb;

        this.showPanelFilters(option, check);
        if (check) {
            Ext.getCmp(prototype.id + '-cmbCountry').show();
            Ext.getCmp(prototype.id + '-contentInfo').hide();
            Ext.getCmp(prototype.id + '-contentInfoOAL').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbCountry').hide();
            Ext.getCmp(prototype.id + '-contentInfo').show();
            Ext.getCmp(prototype.id + '-contentInfoOAL').hide();
        }
        this.btnSearch_click();
    },
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('0' + (this.fecha.getMonth() + 1));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbCarrier').bindStore(Ext.create('Ext.data.ArrayStore',
                {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "All"],
                        ["AM", "Aeroméxico"],
                        ["5D", "AM Connect"],
                        ["VM", "Aeromar"]
                    ]
                }));
        Ext.getCmp(prototype.id + '-cmbCarrier').setValue('');


        Ext.Ajax.request({
            url: prototype.url + '/loadData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...', ''),
            params: {},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstZona = res.lstZona;
                var lstPaises = res.lstPaises;
                var storeCiudades = Ext.create('Ext.data.Store', {
                    data: lstZona,
                    autoLoad: true
                });
                var storePaises = Ext.create('Ext.data.Store', {
                    data: lstPaises,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbZona').bindStore(storeCiudades);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storePaises);
                Ext.getCmp(prototype.id + '-cmbZona').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                Ext.getCmp(prototype.id + '-centerC').unmask();
                me.btnSearch_click();
            }
        });

    },
    hidePanelsGridData: function(checkOAL, searhBy) {

        Ext.getCmp(prototype.id + '-panelMainData').hide();
        Ext.getCmp(prototype.id + '-panelAmountData').hide();
        Ext.getCmp(prototype.id + '-panelAmountDayData').hide();
        Ext.getCmp(prototype.id + '-panelYield').hide();
        Ext.getCmp(prototype.id + '-panelHourData').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxPAX').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHT').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxAVG').hide();
        Ext.getCmp(prototype.id + '-panelDataCityPair').hide();
        Ext.getCmp(prototype.id + '-panelDataCityPairDetail').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxPAXCity').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCity').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxAVGCity').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxPAXCityDetail').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCityDetail').hide();
        Ext.getCmp(prototype.id + '-panelFlightPaxAVGCityDetail').hide();


        Ext.getCmp(prototype.id + '-oal' + '-panelMainData').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelAmountData').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelAmountDayData').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelYield').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelHourData').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAX').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHT').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPair').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPairDetail').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCity').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCity').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCityDetail').hide();
        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCityDetail').hide();

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setSearchParameter();
        this.hidePanelsGridData();

        var checkOAL = searchParams.check;
        var searhBy = searchParams.searhBy;
        var searhByFare = searchParams.searhByFare;
        var searhByFlight = searchParams.searhByFlight;
        var searhByCity = searchParams.searhByCity;

        me.urlRequest = prototype.url + '/';

        if (checkOAL) {
            switch (searhBy) {

                case 'btnFLI':
                    Ext.getCmp(prototype.id + '-oal' + '-panelMainData').show();
                    me.urlRequest = me.urlRequest + 'searchOAL';
                    break;

                case 'btnFARE':
                    switch (searhByFare) {
                        case 'rbFa':
                            Ext.getCmp(prototype.id + '-oal' + '-panelAmountData').show();
                            me.urlRequest = me.urlRequest + 'searchOAL';
                            break;
                        case 'rbFaDay':
                            Ext.getCmp(prototype.id + '-oal' + '-panelAmountDayData').show();
                            me.urlRequest = me.urlRequest + 'searchByDayAmntOAL';
                            break;
                        case 'rbYield':
                            Ext.getCmp(prototype.id + '-oal' + '-panelYield').show();
                            me.urlRequest = me.urlRequest + 'searchbyYieldOAL';
                            break;
                    }

                    break;

                case 'btnHOUR':
                    Ext.getCmp(prototype.id + '-oal' + '-panelHourData').show();
                    me.urlRequest = me.urlRequest + 'searchHourOAL';
                    break;

                case 'btnPAXFLI':
                    me.urlRequest = me.urlRequest + 'searchFLIPAXOAL';
                    switch (searhByFlight) {
                        case 'rbPAX':
                            Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAX').show();
                            break;
                        case 'rbFLIGHT':
                            Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHT').show();
                            break;
                        case 'rbPAXFLI':
                            console.log("Estsmos aqui");
                            Ext.getCmp(prototype.id + '-rbgSELEC').setValue({rb: "rbPAX"});
                            this.btnSearch_click();
                            break;
                    }
                    break;

                case 'btnCITY':
                    Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPair').show();
                    me.urlRequest = me.urlRequest + 'searchCityPairOAL';
                    break;

                case 'btnCITYday':
                    me.urlRequest = me.urlRequest + 'searchCityPairDayOAL';
                    switch (searhByCity) {
                        case 'rbPAXcity':
                            Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCity').show();
                            break;
                        case 'rbFLIGHTcity':
                            Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCity').show();
                            break;
                        case 'rbPAXFLIcity':
                            Ext.getCmp(prototype.id + '-rbgSelCity').setValue({rb: "rbPAXcity"});
                            this.btnSearch_click();
                            break;
                    }
                    break;
            }
        } else {
            switch (searhBy) {

                case 'btnFLI':
                    Ext.getCmp(prototype.id + '-panelMainData').show();
                    me.urlRequest = me.urlRequest + 'search';
                    break;

                case 'btnFARE':
                    switch (searhByFare) {
                        case 'rbFa':
                            Ext.getCmp(prototype.id + '-panelAmountData').show();
                            me.urlRequest = me.urlRequest + 'search';
                            break;
                        case 'rbFaDay':
                            Ext.getCmp(prototype.id + '-panelAmountDayData').show();
                            me.urlRequest = me.urlRequest + 'searchByDayAmnt';
                            break;
                        case 'rbYield':
                            Ext.getCmp(prototype.id + '-panelYield').show();
                            me.urlRequest = me.urlRequest + 'searchByYield';
                            break;
                    }

                    break;

                case 'btnHOUR':
                    Ext.getCmp(prototype.id + '-panelHourData').show();
                    me.urlRequest = me.urlRequest + 'searchHour';
                    break;

                case 'btnPAXFLI':
                    me.urlRequest = me.urlRequest + 'searchFLIPAX';
                    switch (searhByFlight) {
                        case 'rbPAX':
                            Ext.getCmp(prototype.id + '-panelFlightPaxPAX').show();
                            break;
                        case 'rbFLIGHT':
                            Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHT').show();
                            break;
                        case 'rbPAXFLI':
                            Ext.getCmp(prototype.id + '-panelFlightPaxAVG').show();
                            break;
                    }
                    break;

                case 'btnCITY':
                    Ext.getCmp(prototype.id + '-panelDataCityPair').show();
                    me.urlRequest = me.urlRequest + 'searchCityPair';
                    break;

                case 'btnCITYday':
                    me.urlRequest = me.urlRequest + 'searchCityPairDay';
                    switch (searhByCity) {
                        case 'rbPAXcity':
                            Ext.getCmp(prototype.id + '-panelFlightPaxPAXCity').show();
                            break;
                        case 'rbFLIGHTcity':
                            Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCity').show();
                            break;
                        case 'rbPAXFLIcity':
                            Ext.getCmp(prototype.id + '-panelFlightPaxAVGCity').show();
                            break;
                    }
                    break;
            }
        }
        Ext.Ajax.request({
            url: me.urlRequest,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC-panel01').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC-panel01').unmask();
                var res = Ext.JSON.decode(response.responseText);
                me.showGridData(res, searchParams);
            }
        });

    },
    showGridData: function(res, searchParams) {

        console.log('------- Parametros a Enviar -----------');
        console.log(searchParams);


        var anioActual = searchParams.yearFrom;
        var anioAnterior = anioActual - 1;
        var checkOAL = searchParams.check;
        var searhBy = searchParams.searhBy;
        var searhByFare = searchParams.searhByFare;
        var searhByFlight = searchParams.searhByFlight;
        var searhByCity = searchParams.searhByCity;
        if (checkOAL) {
            switch (searhBy) {

                case 'btnFLI':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP1').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP2').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP3').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-grafico01_1').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-grafico01_2').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-grafico01_3').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-grafico01_4').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-label_grafico01_1').setText('Flight by Market ' + anioActual);
                    Ext.getCmp(prototype.id + '-oal' + '-label_grafico01_2').setText('Passenger by Market ' + anioActual);
                    Ext.getCmp(prototype.id + '-oal' + '-label_grafico01_3').setText('Flight by Market ' + anioAnterior);
                    Ext.getCmp(prototype.id + '-oal' + '-label_grafico01_4').setText('Passenger by Market ' + anioAnterior);

                    Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR').setText(anioAnterior + '');
                    Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(1100);
                    break;

                case 'btnFARE':
                    switch (searhByFare) {
                        case 'rbFa':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP4').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP5').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-grafico02_1').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-grafico02_2').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-label_grafico02_1').setText('Fare by Market ' + anioActual);
                            Ext.getCmp(prototype.id + '-oal' + '-label_grafico02_2').setText('Fare by Market ' + anioAnterior);
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR1').setText('' + anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR1').setText('' + anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                            break;
                        case 'rbFaDay':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').show();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').hide();
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR6').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR6').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                            break;
                        case 'rbYield':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP21').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP22').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-grafico03_1').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-grafico03_2').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-label_grafico03_1').setText('Yield by Market ' + anioActual);
                            Ext.getCmp(prototype.id + '-oal' + '-label_grafico03_2').setText('Yield by Market ' + anioAnterior);
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR7').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR7').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                            break;

                    }
                    break;

                case 'btnHOUR':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP6').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP7').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP8').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR2').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR2').setText(anioAnterior + '');
                    Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                    break;

                case 'btnPAXFLI':
                    switch (searhByFlight) {
                        case 'rbPAX':
                            var listaData = res.listaDatabyDayPax;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').show();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').hide();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR3').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR3').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                            break;
                        case 'rbFLIGHT':
                            console.log(res);
                            var listaData = res.listaDatabyDayFlight;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            console.log(listaData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').show();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').hide();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR4').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR4').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                            break;

                    }
                    break;

                case 'btnCITY':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP23').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP24').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-oal' + '-gridDataP25').bindStore(storeGridData);

                    Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEARCity').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEARCity').setText(anioAnterior + '');
                    Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                    break;

                case 'btnCITYday':
                    switch (searhByCity) {
                        case 'rbPAXcity':
                            var listaData = res.listaDatabyDayPax;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').show();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').hide();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR9').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR9').setText(anioAnterior + '');
                            break;
                        case 'rbFLIGHTcity':
                            var listaData = res.listaDatabyDayFli;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').show();
                            Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').hide();
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR10').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR10').setText(anioAnterior + '');

                            break;
                    }
                    break;
            }
        } else {
            switch (searhBy) {

                case 'btnFLI':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataP1').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP2').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP3').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-HD_CURRENTYEAR').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-HD_LASTYEAR').setText(anioAnterior + '');

                    break;

                case 'btnFARE':
                    switch (searhByFare) {
                        case 'rbFa':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP4').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP5').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-grafico02').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR1').setText("Fare <br>" + anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR1').setText("Fare <br>" + anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);

                            break;
                        case 'rbFaDay':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP18').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP19').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR6').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR6').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);

                            break;
                        case 'rbYield':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP21').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP22').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-grafico03').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR7').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR7').setText(anioAnterior + '');
                            Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);

                            break;

                    }
                    break;

                case 'btnHOUR':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataP6').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP7').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP8').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-HD_CURRENTYEAR2').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-HD_LASTYEAR2').setText(anioAnterior + '');
                    break;

                case 'btnPAXFLI':
                    switch (searhByFlight) {
                        case 'rbPAX':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP9').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP10').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP11').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR3').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR3').setText(anioAnterior + '');
                            break;
                        case 'rbFLIGHT':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP12').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP13').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP14').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR4').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR4').setText(anioAnterior + '');
                            break;
                        case 'rbPAXFLI':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP15').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP16').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP17').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR5').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR5').setText(anioAnterior + '');
                            break;
                    }
                    break;

                case 'btnCITY':
                    var listaData = res.listaData;
                    var storeGridData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataP23').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP24').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridDataP25').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-HD_CURRENTYEARCity').setText(anioActual + '');
                    Ext.getCmp(prototype.id + '-HD_LASTYEARCity').setText(anioAnterior + '');
                    break;

                case 'btnCITYday':
                    switch (searhByCity) {
                        case 'rbPAXcity':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP29').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP30').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP31').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR9').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR9').setText(anioAnterior + '');
                            break;
                        case 'rbFLIGHTcity':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP32').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP33').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP34').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR10').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR10').setText(anioAnterior + '');
                            break;
                        case 'rbPAXFLIcity':
                            var listaData = res.listaData;
                            var storeGridData = Ext.create('Ext.data.Store', {
                                data: listaData,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-gridDataP35').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP36').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-gridDataP37').bindStore(storeGridData);
                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR11').setText(anioActual + '');
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR11').setText(anioAnterior + '');
                            break;
                    }
                    break;
            }
        }
    }
    ,
    setSearchParameter: function() {

        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var IN_ZONA = Ext.getCmp(prototype.id + '-cmbZona').getValue();
        var IN_CARRI = Ext.getCmp(prototype.id + '-cmbCarrier').getValue();
        var CCIA = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

        var check = Ext.getCmp(prototype.id + '-chkOAL').getValue();
        var searhBy = Ext.getCmp(prototype.id + '-rbgPRINC').lastValue.rb;
        var searhByFare = Ext.getCmp(prototype.id + '-rbgSelfare').lastValue.rb;
        var searhByFlight = Ext.getCmp(prototype.id + '-rbgSELEC').lastValue.rb;
        var searhByCity = Ext.getCmp(prototype.id + '-rbgSelCity').lastValue.rb;

        searchParams = {
            yearFrom: yearFrom.getValue(),
            monthFrom: monthFrom.getValue(),
            IN_ZONA: IN_ZONA,
            IN_CARRI: IN_CARRI,
            CCIA: CCIA,
            check: check,
            searhBy: searhBy,
            searhByFare: searhByFare,
            searhByFlight: searhByFlight,
            searhByCity: searhByCity,
            strDescripcion: ''
        };


    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');


        yearFrom.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
//        dayFrom.setValue("");
//        dayTo.setValue("");
//        cmbCDEPART.setValue("");
//        cmbCARRIVA.setValue("");
//        cmbSTVAL.setValue("");
//        txtFlight.setValue("");
//        txtTKT.setValue("");
    },
    btnExcel_click: function(obj, e) {

    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelDateFilters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnChange_click: function() {
        var panel = Ext.getCmp(prototype.id + '-oal' + '-gridDataP18');

        if (panel.isVisible()) {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').hide();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').show();
        } else {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP18').show();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP19').hide();
        }
    }
    ,
    btnChange_clickFlightPax: function() {
        var panel = Ext.getCmp(prototype.id + '-oal' + '-gridDataP9');

        if (panel.isVisible()) {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').hide();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').show();
        } else {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP9').show();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP10').hide();
        }
    }
    ,
    btnChangeFlightFlight_click: function() {
        var panel = Ext.getCmp(prototype.id + '-oal' + '-gridDataP12');

        if (panel.isVisible()) {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').hide();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').show();
        } else {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP12').show();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP13').hide();
        }
    }
    ,
    btnChange_clickFlightPaxCity: function() {
        var panel = Ext.getCmp(prototype.id + '-oal' + '-gridDataP29');

        if (panel.isVisible()) {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').hide();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').show();
        } else {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP29').show();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP30').hide();
        }
    }
    ,
    btnChangeFlightFlightOAL_click: function() {
        var panel = Ext.getCmp(prototype.id + '-oal' + '-gridDataP32');

        if (panel.isVisible()) {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').hide();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').show();
        } else {
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP32').show();
            Ext.getCmp(prototype.id + '-oal' + '-gridDataP33').hide();
        }
    }
    ,
    onSetGridCityPair: function(obj, metaData, rowNum, column, obj2, rowData) {

        this.setSearchParameter();
        this.hidePanelsGridData();
        var data = rowData.data;

        searchParams.yearFrom = data.yearFrom;
        searchParams.monthFrom = data.monthFrom;
        searchParams.IN_ZONA = data.IN_ZONA;
        searchParams.IN_CARRI = data.IN_CARRI;
        searchParams.strDescripcion = data.strDescripcion;


        Ext.Ajax.request({
            url: prototype.url + '/searchCityPairDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC-panel01').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC-panel01').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var listaData = res.listaData;
                var anioActual = searchParams.yearFrom;
                var anioAnterior = anioActual - 1;
                var storeGridData = Ext.create('Ext.data.Store', {
                    data: listaData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDataP26').bindStore(storeGridData);
                Ext.getCmp(prototype.id + '-HD_CURRENTYEARCityDet').setText(anioActual + '');
                Ext.getCmp(prototype.id + '-HD_LASTYEARCityDet').setText(anioAnterior + '');
                me.setGridDataP26Sum(listaData);

            }
        });
        Ext.getCmp(prototype.id + '-panelDataCityPairDetail').show();
    },
    onSetGridCityPairOAL: function(obj, metaData, rowNum, column, obj2, rowData) {

        this.setSearchParameter();
        this.hidePanelsGridData();
        var data = rowData.data;
        console.log('----------');
        console.log(data);
        searchParams.yearFrom = data.yearFrom;
        searchParams.monthFrom = data.monthFrom;
        searchParams.IN_ZONA = data.IN_ZONA;
        searchParams.IN_CARRI = data.IN_CARRI;
        searchParams.strDescripcion = data.strDescripcion;


        Ext.Ajax.request({
            url: prototype.url + '/searchCityPairDetailOAL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC-panel01').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC-panel01').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var listaData = res.listaData;
                var anioActual = searchParams.yearFrom;
                var anioAnterior = anioActual - 1;
                var storeGridData = Ext.create('Ext.data.Store', {
                    data: listaData,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-oal' + '-gridDataP26').bindStore(storeGridData);
                Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEARCityDet').setText(anioActual + '');
                Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEARCityDet').setText(anioAnterior + '');

                Ext.getCmp(prototype.id + '-oal' + '-labelCityPairDetail').setText('City Pair Detail - Market : ' + data.IN_ZONA + ' - ' + data.strDescripcion6);
                me.setGridDataP26SumOAL(listaData);


            }
        });
        Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPairDetail').show();
    },
    onSetGridCityPairByDay: function(obj, metaData, rowNum, column, obj2, rowData) {

        var gridPadre = obj.container.id;
        this.setSearchParameter();
        this.hidePanelsGridData();
        var data = rowData.data;

        searchParams.yearFrom = data.yearFrom;
        searchParams.monthFrom = data.monthFrom;
        searchParams.IN_ZONA = data.IN_ZONA;
        searchParams.IN_CARRI = data.IN_CARRI;
        searchParams.strDescripcion = data.strDescripcion;


        Ext.Ajax.request({
            url: prototype.url + '/searchCityPairDayDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC-panel01').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC-panel01').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var listaData = res.listaData;
                var anioActual = searchParams.yearFrom;
                var anioAnterior = anioActual - 1;
                var storeGridData = Ext.create('Ext.data.Store', {
                    data: listaData,
                    autoLoad: true
                });
                switch (gridPadre) {
                    case 'ZoneReviewForm-gridDataP29-body':
                        console.log("Entro xS")
                        Ext.getCmp(prototype.id + '-gridDataP38').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-HD_CURRENTYEAR12').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-HD_LASTYEAR12').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-panelFlightPaxPAXCityDetail').show();
                        me.setGridDataP38Sum(listaData);
                        break;
                    case 'ZoneReviewForm-gridDataP32-body':
                        console.log("Entro");
                        Ext.getCmp(prototype.id + '-gridDataP41').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-HD_CURRENTYEAR13').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-HD_LASTYEAR13').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCityDetail').show();
                        me.setGridDataP41Sum(listaData);
                        break;
                    case 'ZoneReviewForm-gridDataP35-body':
                        Ext.getCmp(prototype.id + '-gridDataP44').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-HD_CURRENTYEAR14').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-HD_LASTYEAR14').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-panelFlightPaxAVGCityDetail').show();
                        me.setGridDataP44Sum(listaData);
                        break;
                }
            }
        });

    },
    onSetGridCityPairByDayOAL: function(obj, metaData, rowNum, column, obj2, rowData) {

        var gridPadre = obj.container.id;
        this.setSearchParameter();
        this.hidePanelsGridData();
        var data = rowData.data;

        searchParams.yearFrom = data.yearFrom;
        searchParams.monthFrom = data.monthFrom;
        searchParams.IN_ZONA = data.IN_ZONA;
        searchParams.IN_CARRI = data.IN_CARRI;
        searchParams.CCIA = data.CCIA;
        searchParams.strDescripcion = data.strDescripcion;


        Ext.Ajax.request({
            url: prototype.url + '/searchCityPairDayDetailOAL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC-panel01').mask('Loading...'),
            params: searchParams,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC-panel01').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var listaData = res.listaDatabyDayPax;
                var anioActual = searchParams.yearFrom;
                var anioAnterior = anioActual - 1;
                var storeGridData = Ext.create('Ext.data.Store', {
                    data: listaData,
                    autoLoad: true
                });
                switch (gridPadre) {
                    case 'ZoneReviewForm-oal-gridDataP29-body':

                        Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR12').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR12').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCityDetail').show();
                        Ext.getCmp(prototype.id + '-oal' + '-labelFlightPaxPAXCityDetail').setText('City Pair Detail - Market : ' + data.IN_ZONA + ' - ' + data.strDescripcion);
                        Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                        me.setGridDataP38OALSum(listaData)
                        break;
                    case 'ZoneReviewForm-oal-gridDataP30-body':

                        Ext.getCmp(prototype.id + '-oal' + '-gridDataP38').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR12').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR12').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCityDetail').show();
                        Ext.getCmp(prototype.id + '-oal' + '-labelFlightPaxPAXCityDetail').setText('City Pair Detail - Market : ' + data.IN_ZONA + ' - ' + data.strDescripcion);
                        Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                        me.setGridDataP38OALSum(listaData)
                        break;
                    case 'ZoneReviewForm-oal-gridDataP32-body':
                        var listaData = res.listaDatabyDayFli;
                        var storeGridData = Ext.create('Ext.data.Store', {
                            data: listaData,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR13').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR13').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCityDetail').show();
                        Ext.getCmp(prototype.id + '-oal' + '-labelFlightPaxFLIGHTCityDetail').setText('City Pair Detail - Market : ' + data.IN_ZONA + ' - ' + data.strDescripcion);
                        Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                        me.setGridDataP41OALSum(listaData);
                        break;
                    case 'ZoneReviewForm-oal-gridDataP33-body':
                        var listaData = res.listaDatabyDayFli;
                        var storeGridData = Ext.create('Ext.data.Store', {
                            data: listaData,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-oal' + '-gridDataP41').bindStore(storeGridData);
                        Ext.getCmp(prototype.id + '-oal' + '-HD_CURRENTYEAR13').setText(anioActual + '');
                        Ext.getCmp(prototype.id + '-oal' + '-HD_LASTYEAR13').setText(anioAnterior + '');
                        Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCityDetail').show();
                        Ext.getCmp(prototype.id + '-oal' + '-labelFlightPaxFLIGHTCityDetail').setText('City Pair Detail - Market : ' + data.IN_ZONA + ' - ' + data.strDescripcion);
                        Ext.getCmp(prototype.id + '-panelPrincipal').setHeight(700);
                        me.setGridDataP41OALSum(listaData);
                        break;

                }

            }
        });

    },
    btnBack_click: function() {

        var panel = Ext.getCmp(prototype.id + '-panelDataCityPairDetail');
        var panelOAL = Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPairDetail');
        var panel2 = Ext.getCmp(prototype.id + '-panelFlightPaxPAXCityDetail');
        var panel2OAL = Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCityDetail');
        var panel3 = Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCityDetail');
        var panel3OAL = Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCityDetail');
        var panel4 = Ext.getCmp(prototype.id + '-panelFlightPaxAVGCityDetail');

        if (panel.isVisible() || panelOAL.isVisible() || panel2.isVisible() || panel2OAL.isVisible() || panel3.isVisible() || panel3OAL.isVisible() || panel4.isVisible()) {

            if (panel.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-panelDataCityPair').show();
            }
            if (panelOAL.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-oal' + '-panelDataCityPair').show();
            }
            if (panel2.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-panelFlightPaxPAXCity').show();
            }
            if (panel2OAL.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxPAXCity').show();
            }
            if (panel3.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-panelFlightPaxFLIGHTCity').show();
            }
            if (panel3OAL.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-oal' + '-panelFlightPaxFLIGHTCity').show();
            }
            if (panel4.isVisible()) {
                this.hidePanelsGridData();
                Ext.getCmp(prototype.id + '-panelFlightPaxAVGCity').show();
            }
        } else {
            global.showMenu();
        }




    },
    setGridDataP26Sum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-totQCFLOW16').setText(data.totQCFLOW16);
        Ext.getCmp(prototype.id + '-totQCPAX16').setText(data.totQCPAX16);
        Ext.getCmp(prototype.id + '-totAVG16avg').setText(data.totAVG16avg);
        Ext.getCmp(prototype.id + '-totQCFLOW15').setText(data.totQCFLOW15);
        Ext.getCmp(prototype.id + '-totQCPAX15').setText(data.totQCPAX15);
        Ext.getCmp(prototype.id + '-totDiffQCFLOW').setText(data.totDiffQCFLOW);
        Ext.getCmp(prototype.id + '-totDiffQCPAX').setText(data.totDiffQCPAX);
        Ext.getCmp(prototype.id + '-totDiffAVG').setText(data.totDiffAVG);
    },
    setGridDataP38Sum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-totQCPAXM16').setText(data.totQCPAXM16);
        Ext.getCmp(prototype.id + '-totQCPAXT16').setText(data.totQCPAXT16);
        Ext.getCmp(prototype.id + '-totQCPAXW16').setText(data.totQCPAXW16);
        Ext.getCmp(prototype.id + '-totQCPAXTH16').setText(data.totQCPAXTH16);
        Ext.getCmp(prototype.id + '-totQCPAXF16').setText(data.totQCPAXF16);
        Ext.getCmp(prototype.id + '-totQCPAXS16').setText(data.totQCPAXS16);
        Ext.getCmp(prototype.id + '-totQCPAXSA16').setText(data.totQCPAXSA16);
        Ext.getCmp(prototype.id + '-totQCPAXTT16').setText(data.totQCPAXTT16);

        Ext.getCmp(prototype.id + '-totQCPAXM15').setText(data.totQCPAXM15);
        Ext.getCmp(prototype.id + '-totQCPAXT15').setText(data.totQCPAXT15);
        Ext.getCmp(prototype.id + '-totQCPAXW15').setText(data.totQCPAXW15);
        Ext.getCmp(prototype.id + '-totQCPAXTH15').setText(data.totQCPAXTH15);
        Ext.getCmp(prototype.id + '-totQCPAXF15').setText(data.totQCPAXF15);
        Ext.getCmp(prototype.id + '-totQCPAXS15').setText(data.totQCPAXS15);
        Ext.getCmp(prototype.id + '-totQCPAXSA15').setText(data.totQCPAXSA15);
        Ext.getCmp(prototype.id + '-totQCPAXTT15').setText(data.totQCPAXTT15);

        Ext.getCmp(prototype.id + '-difftotQCPAXM').setText(data.totdiffavgMONDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXT').setText(data.totdiffavgTUESDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXW').setText(data.totdiffavgWEDNESDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXTH').setText(data.totdiffavgTHURSDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXF').setText(data.totdiffavgFRIDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXS').setText(data.totdiffavgSATURDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXSA').setText(data.totdiffavgSUNDAY);
        Ext.getCmp(prototype.id + '-difftotQCPAXTT').setText(data.totdiffavgTOTAL);
    },
    setGridDataP41Sum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-totQCFLOWM16').setText(data.totQCFLOWM16);
        Ext.getCmp(prototype.id + '-totQCFLOWT16').setText(data.totQCFLOWT16);
        Ext.getCmp(prototype.id + '-totQCFLOWW16').setText(data.totQCFLOWW16);
        Ext.getCmp(prototype.id + '-totQCFLOWTH16').setText(data.totQCFLOWTH16);
        Ext.getCmp(prototype.id + '-totQCFLOWF16').setText(data.totQCFLOWF16);
        Ext.getCmp(prototype.id + '-totQCFLOWS16').setText(data.totQCFLOWS16);
        Ext.getCmp(prototype.id + '-totQCFLOWSA16').setText(data.totQCFLOWSA16);
        Ext.getCmp(prototype.id + '-totQCFLOWTT16').setText(data.totQCFLOWTT16);

        Ext.getCmp(prototype.id + '-totQCFLOWM15').setText(data.totQCFLOWM15);
        Ext.getCmp(prototype.id + '-totQCFLOWT15').setText(data.totQCFLOWT15);
        Ext.getCmp(prototype.id + '-totQCFLOWW15').setText(data.totQCFLOWW15);
        Ext.getCmp(prototype.id + '-totQCFLOWTH15').setText(data.totQCFLOWTH15);
        Ext.getCmp(prototype.id + '-totQCFLOWF15').setText(data.totQCFLOWF15);
        Ext.getCmp(prototype.id + '-totQCFLOWS15').setText(data.totQCFLOWS15);
        Ext.getCmp(prototype.id + '-totQCFLOWSA15').setText(data.totQCFLOWSA15);
        Ext.getCmp(prototype.id + '-totQCFLOWTT15').setText(data.totQCFLOWTT15);

        Ext.getCmp(prototype.id + '-difftotQCFLOWM').setText(data.totdiffavgMONDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWT').setText(data.totdiffavgTUESDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWW').setText(data.totdiffavgWEDNESDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWTH').setText(data.totdiffavgTHURSDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWF').setText(data.totdiffavgFRIDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWS').setText(data.totdiffavgSATURDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWSA').setText(data.totdiffavgSUNDAY);
        Ext.getCmp(prototype.id + '-difftotQCFLOWTT').setText(data.totdiffavgTOTAL);
    },
    setGridDataP44Sum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-totavgMONDAY16').setText(data.totavgMONDAY16);
        Ext.getCmp(prototype.id + '-totavgTUESDAY16').setText(data.totavgTUESDAY16);
        Ext.getCmp(prototype.id + '-totavgWEDNESDAY16').setText(data.totavgWEDNESDAY16);
        Ext.getCmp(prototype.id + '-totavgTHURSDAY16').setText(data.totavgTHURSDAY16);
        Ext.getCmp(prototype.id + '-totavgFRIDAY16').setText(data.totavgFRIDAY16);
        Ext.getCmp(prototype.id + '-totavgSATURDAY16').setText(data.totavgSATURDAY16);
        Ext.getCmp(prototype.id + '-totavgSUNDAY16').setText(data.totavgSUNDAY16);
        Ext.getCmp(prototype.id + '-totavgTOTAL16').setText(data.totavgTOTAL16);
        Ext.getCmp(prototype.id + '-totavgMONDAY15').setText(data.totavgMONDAY15);
        Ext.getCmp(prototype.id + '-totavgTUESDAY15').setText(data.totavgTUESDAY15);
        Ext.getCmp(prototype.id + '-totavgWEDNESDAY15').setText(data.totavgWEDNESDAY15);
        Ext.getCmp(prototype.id + '-totavgTHURSDAY15').setText(data.totavgTHURSDAY15);
        Ext.getCmp(prototype.id + '-totavgFRIDAY15').setText(data.totavgFRIDAY15);
        Ext.getCmp(prototype.id + '-totavgSATURDAY15').setText(data.totavgSATURDAY15);
        Ext.getCmp(prototype.id + '-totavgSUNDAY15').setText(data.totavgSUNDAY15);
        Ext.getCmp(prototype.id + '-totavgTOTAL15').setText(data.totavgTOTAL15);
        Ext.getCmp(prototype.id + '-totdiffavgMONDAY').setText(data.totdiffavgMONDAY);
        Ext.getCmp(prototype.id + '-totdiffavgTUESDAY').setText(data.totdiffavgTUESDAY);
        Ext.getCmp(prototype.id + '-totdiffavgWEDNESDAY').setText(data.totdiffavgWEDNESDAY);
        Ext.getCmp(prototype.id + '-totdiffavgTHURSDAY').setText(data.totdiffavgTHURSDAY);
        Ext.getCmp(prototype.id + '-totdiffavgFRIDAY').setText(data.totdiffavgFRIDAY);
        Ext.getCmp(prototype.id + '-totdiffavgSATURDAY').setText(data.totdiffavgSATURDAY);
        Ext.getCmp(prototype.id + '-totdiffavgSUNDAY').setText(data.totdiffavgSUNDAY);
        Ext.getCmp(prototype.id + '-totdiffavgTOTAL').setText(data.totdiffavgTOTAL);
    },
    setGridDataP26SumOAL: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOW16').setText(data.totQCFLOW16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOW16OAL').setText(data.totQCPAX16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAX16').setText(data.totAVG16avg);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAX16OAL').setText(data.totQCFLOW15);
        Ext.getCmp(prototype.id + '-oal' + '-totAVG16avg').setText(data.totQCPAX15);
        Ext.getCmp(prototype.id + '-oal' + '-totAVG16avgOAL').setText(data.totDiffQCFLOW);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOW15').setText(data.totDiffQCPAX);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOW15OAL').setText(data.totDiffAVG);

        Ext.getCmp(prototype.id + '-oal' + '-totQCPAX15').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAX15OAL').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totAVG15avg').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totAVG15avgOAL').setText(data.totDiffAVG);

        Ext.getCmp(prototype.id + '-oal' + '-totDiffQCFLOW').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totDiffQCFLOWOAL').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totDiffQCPAX').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totDiffQCPAXOAL').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totDiffAVG').setText(data.totDiffAVG);
        Ext.getCmp(prototype.id + '-oal' + '-totDiffAVGOAL').setText(data.totDiffAVG);

    },
    setGridDataP41OALSum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWM16').setText(data.totQCFLOWM16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWM16OAL').setText(data.totQCFLOWM16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWT16').setText(data.totQCFLOWT16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWT16OAL').setText(data.totQCFLOWT16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWW16').setText(data.totQCFLOWW16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWW16OAL').setText(data.totQCFLOWW16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTH16').setText(data.totQCFLOWTH16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTH16OAL').setText(data.totQCFLOWTH16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWF16').setText(data.totQCFLOWF16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWF16OAL').setText(data.totQCFLOWF16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWS16').setText(data.totQCFLOWS16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWS16OAL').setText(data.totQCFLOWS16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWSA16').setText(data.totQCFLOWSA16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWSA16OAL').setText(data.totQCFLOWSA16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTT16').setText(data.totQCFLOWTT16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTT16OAL').setText(data.totQCFLOWTT16OAL);

        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWM15').setText(data.totQCFLOWM15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWM15OAL').setText(data.totQCFLOWM15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWT15').setText(data.totQCFLOWT15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWT15OAL').setText(data.totQCFLOWT15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWW15').setText(data.totQCFLOWW15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWW15OAL').setText(data.totQCFLOWW15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTH15').setText(data.totQCFLOWTH15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTH15OAL').setText(data.totQCFLOWTH15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWF15').setText(data.totQCFLOWF15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWF15OAL').setText(data.totQCFLOWF15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWS15').setText(data.totQCFLOWS15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWS15OAL').setText(data.totQCFLOWS15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWSA15').setText(data.totQCFLOWSA15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWSA15OAL').setText(data.totQCFLOWSA15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTT15').setText(data.totQCFLOWTT15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCFLOWTT15OAL').setText(data.totQCFLOWTT15OAL);
    },
    setGridDataP38OALSum: function(listaData) {
        var data = listaData[0];
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXM16').setText(data.totQCPAXM16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXM16OAL').setText(data.totQCPAXM16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXT16').setText(data.totQCPAXT16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXT16OAL').setText(data.totQCPAXT16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXW16').setText(data.totQCPAXW16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXW16OAL').setText(data.totQCPAXW16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTH16').setText(data.totQCPAXTH16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTH16OAL').setText(data.totQCPAXTH16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXF16').setText(data.totQCPAXF16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXF16OAL').setText(data.totQCPAXF16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXS16').setText(data.totQCPAXS16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXS16OAL').setText(data.totQCPAXS16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXSA16').setText(data.totQCPAXSA16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXSA16OAL').setText(data.totQCPAXSA16OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTT16').setText(data.totQCPAXTT16);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTT16OAL').setText(data.totQCPAXTT16OAL);

        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXM15').setText(data.totQCPAXM15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXM15OAL').setText(data.totQCPAXM15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXT15').setText(data.totQCPAXT15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXT15OAL').setText(data.totQCPAXT15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXW15').setText(data.totQCPAXW15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXW15OAL').setText(data.totQCPAXW15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTH15').setText(data.totQCPAXTH15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTH15OAL').setText(data.totQCPAXTH15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXF15').setText(data.totQCPAXF15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXF15OAL').setText(data.totQCPAXF15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXS15').setText(data.totQCPAXS15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXS15OAL').setText(data.totQCPAXS15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXSA15').setText(data.totQCPAXSA15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXSA15OAL').setText(data.totQCPAXSA15OAL);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTT15').setText(data.totQCPAXTT15);
        Ext.getCmp(prototype.id + '-oal' + '-totQCPAXTT15OAL').setText(data.totQCPAXTT15OAL);
    }

});

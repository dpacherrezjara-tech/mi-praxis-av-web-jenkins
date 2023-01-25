Ext.define('Ext.Praxis.controller.flown.Conciliation.ConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConciliationController',
    searchParams: {},
    paramsTKT_ACS: {},
    Fecha: '',
    hd_A1691: "Manifiestos de Vuelo no encontrados en Manifiestos ACS  : ",
    hd_ACS: "Manifiestos ACS no encontrados en Manifiestos de Vuelo  : ",
    hd_Diff: "Diferencia de Pasajeros Manifiestos de Vuelo Vs Manifiestos ACS  : ",
    _path: '',
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function () {
    },
    ChangeBox: function(obj , newValue , oldValue , eOpts) {
        if (Ext.getCmp(prototype.id+'-chkDifference').getValue()) {
            Ext.getCmp(prototype.id+'-boxDifference').hide();
            Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
            Ext.getCmp(prototype.id+'-boxTicketACS').hide();
            Ext.getCmp(prototype.id+'-boxMainData').show();
        } else {
            Ext.getCmp(prototype.id+'-boxMainData').hide();
            Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
            Ext.getCmp(prototype.id+'-boxTicketACS').hide();
            Ext.getCmp(prototype.id+'-boxDifference').show();
        }
    },
    ChangeTKT: function(obj , newValue , oldValue , eOpts) {
        if (Ext.getCmp(prototype.id+'-chkTKT').getValue()) {
            var boxActual = '';
            if(Ext.getCmp(prototype.id+'-boxDifference').isVisible()) boxActual = prototype.id+'-boxDifference';
            else if(Ext.getCmp(prototype.id+'-boxTicketPaper').isVisible()) boxActual = prototype.id+'-boxTicketPaper';
            else if(Ext.getCmp(prototype.id+'-boxMainData').isVisible()) boxActual = prototype.id+'-boxMainData';
            else if(Ext.getCmp(prototype.id+'-boxTicketACS').isVisible()) boxActual = prototype.id+'-boxTicketACS';
            var obj = {};
            obj.DFLIGHT=this.Fecha;
            this.loadTicketPaper(obj, boxActual);
        } else {
            Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
            Ext.getCmp(prototype.id+'-boxMainData').hide();
            Ext.getCmp(prototype.id+'-boxTicketACS').hide();
            Ext.getCmp(prototype.id+'-boxDifference').show();
        }
    },
    subirArchivo: function() {
        this.Fecha = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFilterDatem').getValue(), 'Ymd');
        this.upload(this.Fecha);
    },
    LoadTKT_ACS: function(dv, record, item, index, e) {
        var obj = dv.dataSource.data.items[item].data;
        Ext.getCmp(prototype.id+'-gridDataTKT_ACS').setTitle('<center style="font-weight:bold;">Flight Number '+obj.NFLIGHT+'\t' +' '+ obj.CDEPART+':'+ obj.strDescCDEPART+' - '+obj.CARRIVA+':'+ obj.strDescCARRIVA+'</center>');
        this.loadTicket_ACS(obj);
    },
    LoadTKT_Paper: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        this.loadTicketPaper(data, prototype.id+'-boxDifference');
    },
    
    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnDisplay_click: function() {
    },
    btnExcel_click: function(obj, e) {
//	}else if(vskMain.selectedChild == boxTicketPaper){
//		ADGExcel.exportToExcel(gridDataTKT,'Ticket Paper.xls',null);
//	}else if(vskMain.selectedChild == boxTicketACS){
//		ADGExcel.exportToExcel(gridDataTKT_ACS,'Ticket Conciliation.xls',null);
//	}
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            this.exportExcel(prototype.url+'/getXLSXMainData?fileName=Conciliation Flight Manifest Vs ACS Manifest&Fecha='+this.Fecha+"&hd_A1691="+this.hd_A1691+"&hd_ACS="+this.hd_ACS);
        } else if (Ext.getCmp(prototype.id+'-boxDifference').isVisible()) {
            this.exportExcel(prototype.url+'/getXLSXDifference?fileName=Passenger Difference&Fecha='+this.Fecha+"&hd_Diff="+this.hd_Dif);
        } else if (Ext.getCmp(prototype.id+'-boxTicketPaper').isVisible()) {
            var gridData = Ext.getCmp(prototype.id + '-gridDataTKT');
            var dataIndex = '', sortState = '';
            for (var i = 0; i < gridData.columns.length; i++) {
                var columns = gridData.columns[i];
                if (columns.sortable) {
                    if (columns.sortState !== null) {
                        dataIndex = columns.dataIndex;
                        sortState = columns.sortState;
                        break;
                    }
                }
            }
            this.exportExcel(_path + "&fileName=Ticket Paper&dataIndex=" + dataIndex + "&sortState=" + sortState);
//            this.exportExcel(prototype.url+'/getXLSXTicketPaper?fileName=Ticket Paper&DFLIGHT='+this.Fecha);
            //            global.getFile(prototype.url+'/getXLSXTicketPaper?DFLIGHT='+this.paramsTicketPaper.DFLIGHT+'&NFLIGHT='+this.paramsTicketPaper.NFLIGHT);
        } else if (Ext.getCmp(prototype.id+'-boxTicketACS').isVisible()) {
            this.exportExcel(prototype.url+'/getXLSXTicketACS?fileName=Ticket Conciliation&DFLIGHT='+this.paramsTKT_ACS.DFLIGHT+'&NFLIGHT='+this.paramsTKT_ACS.NFLIGHT+'&CDEPART='+this.paramsTKT_ACS.CDEPART+'&CARRIVA='+this.paramsTKT_ACS.CARRIVA);
//            this.exportExcel(prototype.url+'/getXLSXTicketACS?fileName=Passenger Difference&Fecha='+this.Fecha+"&hd_Diff="+this.hd_Dif);
//            global.getFile(prototype.url+'/getXLSXTicketACS?DFLIGHT='+this.paramsTKT_ACS.DFLIGHT+'&NFLIGHT='+this.paramsTKT_ACS.NFLIGHT+'&CDEPART='+this.paramsTKT_ACS.CDEPART+'&CARRIVA='+this.paramsTKT_ACS.CARRIVA);
        }
    },
    btnClear_click: function(obj, e) {
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxDifference').isVisible() || Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id+'-boxTicketPaper').isVisible()) {
            Ext.getCmp(prototype.id+'-chkTKT').show();
            if (!Ext.getCmp(prototype.id+'-chkTKT').getValue()) {
                Ext.getCmp(prototype.id+'-boxTicketACS').hide();
                Ext.getCmp(prototype.id+'-boxMainData').hide();
                Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
                Ext.getCmp(prototype.id+'-boxDifference').show();
            }
        } else if (Ext.getCmp(prototype.id+'-boxTicketACS').isVisible()) {
            Ext.getCmp(prototype.id+'-boxTicketACS').hide();
            Ext.getCmp(prototype.id+'-boxMainData').hide();
            Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
            Ext.getCmp(prototype.id+'-boxDifference').show();
        } else {
            global.showMenu();
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="upload">
    upload: function (Fecha) {
        Ext.Ajax.request({
            url: prototype.url+'/upload',
            method: 'POST',
            timeout: 60000000,
            params: {Fecha: Fecha},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function (response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id+'-boxTicketACS').hide();
                    Ext.getCmp(prototype.id+'-boxMainData').hide();
                    Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
                    Ext.getCmp(prototype.id+'-boxDifference').show();
                    
                    global.Msg({ msg: res.mensaje });
                    
                    Ext.getCmp(prototype.id+'-gridData3').bindStore(
                        Ext.create("Ext.Praxis.store.flown.GridData", { data: res.lstA1691Dif })
                    );
                    Ext.getCmp(prototype.id+'-gridData').bindStore(
                        Ext.create("Ext.Praxis.store.flown.GridData", { data: res.lstA1691 })
                    );
                    Ext.getCmp(prototype.id+'-gridData2').bindStore(
                        Ext.create("Ext.Praxis.store.flown.GridData", { data: res.lstExcel })
                    );
                    if (res.lstA1691.length > 0) {
                        Ext.getCmp(prototype.id+'-chkTKT').show();
                        var fec = res.lstA1691[0].strFormatDate;
                        Ext.getCmp(prototype.id+'-hd_A1691').setText(me.hd_A1691+fec);
                        Ext.getCmp(prototype.id+'-hd_ACS').setText(me.hd_ACS+fec);
                        Ext.getCmp(prototype.id+'-hd_Diff').setText(me.hd_Diff+fec);
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadTicketPaper">
    loadTicketPaper: function(params, boxActual) {
        var storeGridData = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url+'/loadTicketPaper'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(boxActual).mask('Loading...'),
                    obj.proxy.extraParams = {beanString: JSON.stringify(params)};
                },
                load: function(obj) {
                    Ext.getCmp(boxActual).unmask();
                    if (obj.data.length > 0) {
                        if (!Ext.getCmp(prototype.id+'-chkTKT').getValue()) {
                            Ext.getCmp(prototype.id+'-chkTKT').hide();
                        }
                        Ext.getCmp(prototype.id+'-boxDifference').hide();
                        Ext.getCmp(prototype.id+'-boxMainData').hide();
                        Ext.getCmp(prototype.id+'-boxTicketACS').hide();
                        Ext.getCmp(prototype.id+'-boxTicketPaper').show();
                    } else {
                        global.Msg({ msg: 'Data not found' });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataTKT').bindStore(storeGridData);
        _path = prototype.url + '/getXLSXTicketPaper?beanString=' + encodeURI(JSON.stringify(params));
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadTicket_ACS">
    loadTicket_ACS: function(params) {
        var storeGridData = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url+'/loadTicket_ACS'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id+'-boxDifference').mask('Loading...'),
                    obj.proxy.extraParams = {beanString: JSON.stringify(params)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id+'-boxDifference').unmask();
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            if (!Ext.getCmp(prototype.id+'-chkTKT').getValue()) {
                                Ext.getCmp(prototype.id+'-chkTKT').hide();
                            }
                            Ext.getCmp(prototype.id+'-boxDifference').hide();
                            Ext.getCmp(prototype.id+'-boxMainData').hide();
                            Ext.getCmp(prototype.id+'-boxTicketACS').show();
                            Ext.getCmp(prototype.id+'-boxTicketPaper').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataTKT_ACS').bindStore(storeGridData);
        this.paramsTKT_ACS = {
            DFLIGHT: params.DFLIGHT,
            NFLIGHT: params.NFLIGHT,
            CDEPART: params.CDEPART,
            CARRIVA: params.CARRIVA
        };
    },
    //</editor-fold>
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
//        var fecha = Ext.getCmp(prototype.id+'-txtFilterDatem');
//        var fechaSeleccionada = Ext.util.Format.date(fecha.getValue(), 'Ymd');
//        var fechaTitle = Ext.util.Format.date(fecha.getValue(), 'Y-m-d');
//        var title, title2, title3;
//        
//        var ocultoBoxTicketACS = Ext.getCmp(prototype.id+'-boxTicketACS').getHidden();
//        var ocultoBoxTicketPaper = Ext.getCmp(prototype.id+'-boxTicketPaper').getHidden();
//        
//        } else if (!ocultoBoxTicketACS) {
//            global.getFile(prototype.url+'/getXLSXTicketACS?DFLIGHT='+this.paramsTKT_ACS.DFLIGHT+'&NFLIGHT='+this.paramsTKT_ACS.NFLIGHT+'&CDEPART='+this.paramsTKT_ACS.CDEPART+'&CARRIVA='+this.paramsTKT_ACS.CARRIVA);
//        } else if (!ocultoBoxTicketPaper) {
//            global.getFile(prototype.url+'/getXLSXTicketPaper?DFLIGHT='+this.paramsTicketPaper.DFLIGHT+'&NFLIGHT='+this.paramsTicketPaper.NFLIGHT);
//        }
    }
});

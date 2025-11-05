/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.SalesAgentControl.SalesAgentControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAgentControlController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    obJPADJ:{},
    beanHistoric: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    society: '',
    month:'',
    me: '',
    searchParams: {},
    searchParamsHistoric: {},
    paramsDetail: {},
    paramsObtainData: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'SalesAgentControlForm';
        prototype.url = CONTEXTPATH + '/SalesAgentControl';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SalesAgentControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#SalesAgentControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesAgentControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesAgentControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesAgentControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesAgentControlForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesAgentControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#SalesAgentControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesAgentControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesAgentControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesAgentControlForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#SalesAgentControlForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#SalesAgentControlForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#SalesAgentControlForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#SalesAgentControlForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#BankReconciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
            }
        });
    },
    xpanel_afterrender: function () {
        
        $('#SalesAgentControlForm-btnToggleSwitchSalesAgent').change(function () {
            me.btnDisplay_click();
        });
        
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        // === Cálculo de mes actual y 4 meses atrás ===
        var monthActual = fechaActual.getMonth() + 1; // 1-12
        var yearActual = fechaActual.getFullYear();

        // Restar 4 meses (sin romper el año)
        var fechaDesde = new Date(fechaActual);
        fechaDesde.setMonth(fechaDesde.getMonth() - 4);

        var monthDesde = fechaDesde.getMonth() + 1;
        var yearDesde = fechaDesde.getFullYear();

        // Formatear con 2 dígitos para coincidir con "code" del store ("01", "02", etc.)
        if (monthActual < 10) monthActual = '0' + monthActual;
        if (monthDesde < 10) monthDesde = '0' + monthDesde;

        // === Vincular los stores ===
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // === Asignar valores ===
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearDesde);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);

        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(""); 
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(""); 

        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.SOURCEAGENT = 2;
        this.paramsObtainData.CANALAGENT = 2;
        this.paramsObtainData.ACREDITACIONAGENT = 2;
        this.paramsObtainData.RIESGOAGENT = 2;
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                
                var res = Ext.JSON.decode(response.responseText);
                
                me.lstCountry = res.lstCountry;
                me.lstsSourceAgent = res.lstsSourceAgent;
                me.lstsCanalAgent = res.lstsCanalAgent;
                me.lstsAcreditacionAgent = res.lstsAcreditacionAgent;
                me.lstsRiesgoAgent = res.lstsRiesgoAgent;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                
                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstsSourceAgent,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbSourceAgent').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbSourceAgent').setValue('');
                
                var storeData5 = Ext.create('Ext.data.Store', {
                    data: me.lstsCanalAgent,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbCanalAgent').bindStore(storeData5);
                Ext.getCmp(prototype.id + '-cmbCanalAgent').setValue('');
                
                var storeData6 = Ext.create('Ext.data.Store', {
                    data: me.lstsAcreditacionAgent,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').bindStore(storeData6);
                Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').setValue('');
                
                me.lstsRiesgoAgent = me.lstsRiesgoAgent.map(function(item) {
                var cleanName = item.NAME;

                cleanName = cleanName
                    .replace(/â€“/g, '–')
                    .replace(/â€”/g, '—')
                    .replace(/â€™/g, "'")
                    .replace(/â€œ|â€/g, '"')
                    .replace(/\s+/g, ' ');

                return Object.assign({}, item, { NAME: cleanName });
            });

            var storeData7 = Ext.create('Ext.data.Store', {
                data: me.lstsRiesgoAgent,
                autoLoad: true
            });

            var combo = Ext.getCmp(prototype.id + '-cmbRiesgoAgent');
            combo.bindStore(storeData7);

            combo.setValue('');

                
                
                
                global.clear();
            }
        });
        
        Ext.Ajax.request({
            url: prototype.url + '/getProcessDate',
            method: 'GET',
            success: function (response) {
                const res = Ext.decode(response.responseText);
                if (res.success && res.processDate) {
                    let val = res.processDate; 

                    const [datePart, timePart] = val.split('-');
                    if (datePart && timePart) {
                        const formattedDate = `${datePart.substring(0,4)}-${datePart.substring(4,6)}-${datePart.substring(6,8)}`;
                        const formattedTime = `${timePart.substring(0,2)}:${timePart.substring(2,4)}:${timePart.substring(4,6)}`;
                        val = `${formattedDate} ${formattedTime}`;
                    }

                    Ext.getCmp(prototype.id + '-txtProcess').setValue(val);
                }
            },
            failure: function () {
                console.error('❌ Error al obtener la fecha de proceso');
            }
        });


        
    },
    obtainDataBKP: function () {
        var month = me.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");

    },
    btnSearch_click: function (obj, e) {
            this.setFormatParameter();
            this.setGridData();
    },
    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSociety').getValue();
        me.bean.IN_INVOICE = Ext.getCmp(prototype.id + '-txtINVOICE').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbSourceAgent').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbCanalAgent').getValue();
        me.bean.IN_ACCREDITATION = Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').getValue();
        me.bean.IN_RISK = Ext.getCmp(prototype.id + '-cmbRiesgoAgent').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParams11111');
        console.log(me)
        
                
               
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF214");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSales'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setFormatParameterDashboard: function () {
        me.bean = {};
        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() ;
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },
    setGridDataDashboard: function () {
        console.log(searchParams, 'searchParamsDashboard');
        win.lblUser_toolTip("Estructura: MPF214");
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSumaryMain'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                       
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
let lstData = [];
for (let value of obj.data.items) {
    lstData.push(value.data);
}

let QTY_INVOICES = 0;
let SVFOPL = 0;
let QTY_100_ALL = 0;
// quitar acumulador de porcentajes; lo calcularemos al final a partir de totales
let QTY_100_PENDING = 0;
let QTY_NOT_FOUND = 0;

let a = [];
let dataRoot = { text: '.', expanded: false, children: [] };

Ext.Object.each(lstData, function (index, value) {
    if (a.indexOf(value.strFormatDate) < 0) {

        // Acumuladores por mes
        let V_QTY_INVOICES = 0;
        let V_SVFOPL = 0;
        let V_QTY_100_ALL = 0;
        let V_QTY_NOT_FOUND = 0;

        // Calcular sumas por mes
        Ext.Object.each(lstData, function (index, valuex) {
            if (value.strFormatDate === valuex.strFormatDate) {
                V_QTY_INVOICES += valuex.QTY_INVOICES;
                V_SVFOPL += valuex.SVFOPL;
                V_QTY_100_ALL += valuex.QTY_100_ALL;
                V_QTY_NOT_FOUND += valuex.QTY_NOT_FOUND;
            }
        });

        // Calcular porcentaje de avance por mes (Praxis sobre Avianca)
        // ESTE porcentaje es solo para mostrar en el nodo del mes (no se suma)
        let V_QTY_100_RATE = 0;
        if (V_QTY_INVOICES > 0) {
            V_QTY_100_RATE = (V_QTY_100_ALL / V_QTY_INVOICES) * 100;
            V_QTY_100_RATE = Math.min(100, V_QTY_100_RATE);
        }

        // Sumar a los totales generales (solo sumamos cantidades, no porcentajes)
        QTY_INVOICES += V_QTY_INVOICES;
        SVFOPL += V_SVFOPL;
        QTY_100_ALL += V_QTY_100_ALL;
        QTY_NOT_FOUND += V_QTY_NOT_FOUND;
        // NO sumar V_QTY_100_RATE a QTY_100_PENDING aquí

        // Agregar nodo padre (mes)
        a.push(value.strFormatDate);
        dataRoot.children.push({
            strFormatDate: value.strFormatDate,
            QTY_INVOICES: V_QTY_INVOICES,
            SVFOPL: V_SVFOPL,
            QTY_100_ALL: V_QTY_100_ALL,
            QTY_NOT_FOUND: V_QTY_NOT_FOUND,
            QTY_100_PENDING: V_QTY_100_RATE.toFixed(2), // porcentaje del mes con dos decimales
            expanded: false,
            children: []
        });

        // Agregar nodos hijos (sociedades)
        Ext.Object.each(lstData, function (index, value01) {
            if (value.strFormatDate === value01.strFormatDate) {
                let percentPending = 0;
                if (value01.QTY_INVOICES > 0) {
                    percentPending = (value01.QTY_100_ALL / value01.QTY_INVOICES) * 100;
                    percentPending = Math.min(100, percentPending);
                }

                dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                    strFormatDate: value01.strFormatDate,
                    CCUST: value01.SOCIETY,
                    QTY_INVOICES: value01.QTY_INVOICES,
                    SVFOPL: value01.SVFOPL,
                    QTY_100_ALL: value01.QTY_100_ALL,
                    QTY_NOT_FOUND: value01.QTY_NOT_FOUND,
                    QTY_100_PENDING: percentPending.toFixed(2),
                    leaf: true
                });
            }
        });
    }
});

// Asignar al store
var storeTree = Ext.create('Ext.data.TreeStore', {
    root: dataRoot
});
Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);

// ==== Calcular RATE global correctamente a partir de totales ====
let overallRate = 0;
if (QTY_INVOICES > 0) {
    overallRate = (QTY_100_ALL / QTY_INVOICES) * 100;
    overallRate = Math.min(100, overallRate);
}
QTY_100_PENDING = overallRate; // valor numérico (porcentaje)

// Mostrar totales formateados
Ext.getCmp(prototype.id + '-QTY_INVOICES').setText(Ext.util.Format.number(QTY_INVOICES, '0,000'));
Ext.getCmp(prototype.id + '-SVFOPL').setText(Ext.util.Format.number(SVFOPL, '0,000.00'));
Ext.getCmp(prototype.id + '-QTY_100_ALL').setText(Ext.util.Format.number(QTY_100_ALL, '0,000'));
Ext.getCmp(prototype.id + '-QTY_100_PENDING').setText(Ext.util.Format.number(QTY_100_PENDING, '0.00') + ' %');
Ext.getCmp(prototype.id + '-QTY_NOT_FOUND').setText(Ext.util.Format.number(QTY_NOT_FOUND, '0,000'));

                            
                            
                            let totals = [];
                            let totalCantidad = QTY_INVOICES + QTY_100_ALL + QTY_100_PENDING;

                            if (totalCantidad > 0) {
                                let aviancaPerc = (QTY_INVOICES / totalCantidad) * 100;
                                let praxisTotalPerc = (QTY_100_ALL / totalCantidad) * 100;
                                let praxisPendingPerc = (QTY_100_PENDING / totalCantidad) * 100;

                                totals.push({
                                    LABEL: 'Avianca',
                                    Perc2: QTY_INVOICES,
                                    VENDOR: 'Avianca:\n' + Ext.util.Format.number(aviancaPerc, '0.00%')
                                });

                                totals.push({
                                    LABEL: 'Praxis Total',
                                    Perc2: QTY_100_ALL,
                                    VENDOR: 'Praxis Total:\n' + Ext.util.Format.number(praxisTotalPerc, '0.00%')
                                });

                                totals.push({
                                    LABEL: 'Praxis Pendiente',
                                    Perc2: QTY_100_PENDING,
                                    VENDOR: 'Praxis Pendiente:\n' + Ext.util.Format.number(praxisPendingPerc, '0.00%')
                                });
                            }

                            let storeDataPie = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeDataPie);

                          // === GRÁFICO DE BARRAS AGRUPADAS POR MES ===
                            let dataBar = [];

                            // Recorremos los meses agrupados (padres del árbol)
                            Ext.Array.each(dataRoot.children, function (mes) {
                                dataBar.push({
                                    month: mes.strFormatDate,    // Ejemplo: "2025-Jan"
                                    Avianca: mes.QTY_INVOICES,
                                    PraxisTotal: mes.QTY_100_ALL,
                                    NOtFound: mes.QTY_NOT_FOUND
                                });
                            });

                            // Ordenar los meses correctamente (YYYY-MMM)
                            const monthOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

                            dataBar.sort((a, b) => {
                                const [yearA, monA] = a.month.split('-');
                                const [yearB, monB] = b.month.split('-');

                                // Comparar primero el año
                                const yearDiff = parseInt(yearA) - parseInt(yearB);
                                if (yearDiff !== 0) return yearDiff;

                                // Luego el orden del mes
                                return monthOrder.indexOf(monA) - monthOrder.indexOf(monB);
                            });

                            // Configuramos el gráfico dinámicamente
                            let chart = Ext.getCmp(prototype.id + '-displayBarSM');

                            chart.setStore({
                                fields: ['month', 'Avianca', 'PraxisTotal','NOtFound'],
                                data: dataBar
                            });

                            // Ajustamos la serie a los tres campos
                            let serie = chart.getSeries()[0];
                            serie.setYField(['Avianca', 'PraxisTotal','NOtFound']);
                            serie.setTitle(['Avianca Total', 'Praxis Total','Not Found']);




                        }
                    }
                }
            });
        me.getPaggin(); 
    },

    
    onGridDataDetail: function (column, e, rowIndex, colIndex, rowData) {
        
        
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};
        
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
        }
        
        if (colIndex == 7) {
            me.bean.IN_NOTFOUND = 'Y';
        } else {
            me.bean.IN_NOTFOUND = '';
        }
        
        const mapCCUST = {
            '2K01': '547',
            'AV01': '134',
            'LR01': '133',
            'TA01': '202'
        };
        
        let codigo = mapCCUST[rowPadre.CCUST];
        Ext.getCmp(prototype.id + '-typeSociety').setValue(codigo);
        console.log(codigo,"RAAAAAAAAAAAAA")
        
        
        me.bean.IN_DATE = fecha;
        me.bean.IN_INVOICE = "";
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() ;
        me.paramsDetail.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParams');
        this.setGridDataDetail(true);
    },
    setGridDataDetail: function (down){
        console.log(down,'down')
        if (down) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetail';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }
        
        win.lblUser_toolTip("Estructura: MPF214");
        console.log(me.paramsDetail.beanString,'me.paramsDetail.beanString')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSales'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        me.getPaggin(); 
    },
    // </editor-fold>
    
    
    
    //BAJAR A MES
    
    
    
    /////////AGREGAMOS CONSLTA PARA LISTA IMF150
    ///////////////////////////////////////////////////
    
    
    onClickDetailMonthIMF150: function (arg, obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataIMF150';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        
        me.obJPADJ = {};
        me.obJPADJ.IN_SAGENT = rowData.data.VENDOR;
        me.obJPADJ.CCUST = rowData.data.CCUST;
       
        
        me.obJPADJ.IN_FPAYMENT = arg;
        
        
        me.obJPADJ.beanString = JSON.stringify(me.obJPADJ);
        
        
        
        this.setGridDataIMF150(rowData.data.VENDOR,rowData.data.NAGENT);
        
        
        
    },
          
     
    setGridDataIMF150: function(agente,nombre_ag) {
        win.lblUser_toolTip("Estructura: IMF150");

        me.setWidthPie();
        
        
        var lbl_ag = agente + " - " + nombre_ag;
        console.log(lbl_ag);
        Ext.getCmp(prototype.id + '-labelIMF150').setText(lbl_ag);
        
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchListIMF150'
                }, listeners: {
                    beforeload: function(obj) {
//                        Ext.getCmp(prototype.id + '-panelGridDataIMF150').mask('Loading...');
                        obj.proxy.extraParams = me.obJPADJ;                                    
                        
                    },
                    load: function(obj) {
//                        Ext.getCmp(prototype.id + '-panelGridDataIMF150').unmask();
                        var pag = Ext.getCmp(prototype.id + '-pagginIMF150');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }else {
//                            var year = me.currentSDate.substring(0, 4);
//                            var month = me.currentSDate.substring(4, 6);
//
//                            var monthNames = ["January", "February", "March", "April", "May", "June",
//                                "July", "August", "September", "October", "November", "December"];
//
//                            title = " Sales Date : " + monthNames[parseInt(month) - 1] + " " + year;
//                        console.log(title);
//                        Ext.getCmp(prototype.id + '-labelIMF150').setText(title);
//                        Ext.getCmp(prototype.id + '-labelIMF150').setVisible(true);
                    }
                    me.setWidthPie();
                    }
                }
            });
            
            global.clear();
            this.getPaggin();
            Ext.getCmp(prototype.id + '-gridDataIMF150').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pagginIMF150').bindStore(storeGridDatas);
        
    },
    
    ///onClickDetailA720
    
    
    onClickDetailA720: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataA270';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        console.log("ESTAMOS AQUI");
        console.log(obj);
        console.log(rowData);
        
        me.obJPADJ = {};
      
        me.obJPADJ.O_CCUST = rowData.data.O_CCUST;
        me.obJPADJ.O_MES = rowData.data.O_MES;
        me.obJPADJ.O_SAGENT = rowData.data.O_SAGENT;
        me.obJPADJ.O_FPAYMENT = rowData.data.O_FPAYMENT;
        
      
        
        
        me.obJPADJ.beanString = JSON.stringify(me.obJPADJ);
        
        
        
        this.setGridDataIA720(rowData.data.O_SAGENT,rowData.data.O_MES);
        
        
        
    },
          
     
    setGridDataIA720: function(agente,nombre_ag) {
        win.lblUser_toolTip("Estructura: A720");

        me.setWidthPie();
        
        // Extraer año y mes
        var year = nombre_ag.substring(0, 4);   // "2025"
        var month = nombre_ag.substring(4, 6);  // "10"

        // Arreglo de nombres de meses
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];

        // Convertir mes a índice (0-based)
        var monthIndex = parseInt(month, 10) - 1;
        
        // Concatenar texto con nombre del mes
        lbl_ag = agente + " - " + monthNames[monthIndex] + " " + year;

        // Setear en el label
        Ext.getCmp(prototype.id + '-labelA270').setText(lbl_ag);
        
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchListA720'
                }, listeners: {
                    beforeload: function(obj) {
//                        Ext.getCmp(prototype.id + '-panelGridDataA270').mask('Loading...');
                        obj.proxy.extraParams = me.obJPADJ;                                    
                        
                    },
                    load: function(obj) {
//                        Ext.getCmp(prototype.id + '-panelGridDataA270').unmask();
                        var pag = Ext.getCmp(prototype.id + '-pagginA720');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }else {
//                            var year = me.currentSDate.substring(0, 4);
//                            var month = me.currentSDate.substring(4, 6);
//
//                            var monthNames = ["January", "February", "March", "April", "May", "June",
//                                "July", "August", "September", "October", "November", "December"];
//
//                            title = " Sales Date : " + monthNames[parseInt(month) - 1] + " " + year;
//                        console.log(title);
//                        Ext.getCmp(prototype.id + '-labelIMF150').setText(title);
//                        Ext.getCmp(prototype.id + '-labelIMF150').setVisible(true);
                    }
//                    me.setWidthPie();
                    }
                }
            });
            
            global.clear();
            this.getPaggin();
            Ext.getCmp(prototype.id + '-gridDataA270').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pagginA720').bindStore(storeGridDatas);
        
    },
    
    
    
    
    ///////////////////////
    
    
    onLoadClick: function () {
        var fileField = Ext.getCmp(prototype.id + '-file');
        var fileValue = fileField.getValue();

        if (!fileValue) {
            Ext.Msg.alert('Validation', 'Please select an Excel file before loading.');
            return;
        }

        var msjPregunta = 'Sure to load file?';

        Ext.MessageBox.show({
            title: 'Load Merchants',
            msg: msjPregunta,
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'ok') {
                    me.onFileLoad();
                }
            }
        });
    },
    
    
    
    
    
    onFileLoad: function () {
        let beanValidation = {};
        let value = "I";
        beanValidation.OPTION = value;
        console.log(beanValidation.OPTION);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        let beanString = JSON.stringify(beanValidation);

        var form = Ext.getCmp(prototype.id + '-formMerchant').getForm();

        form.submit({
            url: prototype.url + '/setUploadInvoice',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (f, o) {

                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});
                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    btnExcel_click: function (obj, e) {
       Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    
    exportExcel: function () {
        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                me.setFormatParameterDashboard()
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
                break;
             case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXDetailMain?beanString=' + encodeURI(searchParams.beanString));
                break;
             case  '-panelGridDataIMF150':
                global.getFile(prototype.url + '/getXLSXIMF150?beanString=' + encodeURI(me.obJPADJ.beanString));
                break;
             case  '-panelGridDataA270':
                global.getFile(prototype.url + '/getXLSXA720?beanString=' + encodeURI(me.obJPADJ.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
//    
//    btnClear_click: function (obj, e) {
//        this.initDate();
//
//        win.setValue('cmbCountry', '');
//        win.setValue('cmbCardType', '');
//        win.setValue('txtTicket', '');
//        win.setValue('txtCard1', '');
//        win.setValue('txtCard2', '');
//        win.setValue('txtAUTHNBR', '');
//        win.setValue('txtMERCHN', '');
//        win.setValue('cmbSource', '');
//        win.setValue('txtPNR', '');
//        win.setValue('txtSAGENT', '');
//        win.setValue('txtAMOUNT', '');
//        win.setValue('cmbDebitType', '');
//        win.setValue('cmbStatus', '');
//    },
//    
    
    
    
    btnFilter_click: function (obj) {
//        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual,'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                
                 Ext.getCmp(prototype.id + '-typeSociety').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbCountry').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbSourceAgent').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbCanalAgent').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbRiesgoAgent').setDisabled(false);
                 Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(false);
                 Ext.getCmp(prototype.id + '-pie').setVisible(true);
                 Ext.getCmp(prototype.id + '-panelHeight').setHeight(600);
                 Ext.getCmp(prototype.id + '-filterChange').setVisible(false);
                 Ext.getCmp(prototype.id + '-panelRbtDetail').setVisible(false);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataIMF150':
                 Ext.getCmp(prototype.id + '-typeSociety').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbCountry').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbSourceAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbCanalAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbRiesgoAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(true);
                 Ext.getCmp(prototype.id + '-pie').setVisible(true);
                 Ext.getCmp(prototype.id + '-filterChange').setVisible(false);
                 Ext.getCmp(prototype.id + '-panelRbtDetail').setVisible(false);
                  Ext.getCmp(prototype.id + '-panelHeight').setHeight(600);
                me.pagginActual = '-pagginIMF150';
                break;
             case  '-panelDashboardSales':
                 Ext.getCmp(prototype.id + '-typeSociety').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbCountry').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbSourceAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbCanalAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbAcreditacionAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbRiesgoAgent').setDisabled(true);
                 Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(true);
                 Ext.getCmp(prototype.id + '-pie').setVisible(false);
                 Ext.getCmp(prototype.id + '-filterChange').setVisible(true);
                 Ext.getCmp(prototype.id + '-panelRbtDetail').setVisible(true);
                  Ext.getCmp(prototype.id + '-panelHeight').setHeight(600);
                me.pagginActual = '-pagginIMF150';
                break;
            case  '-panelGridDataA270':
                 Ext.getCmp(prototype.id + '-panelHeight').setHeight(630);
                 Ext.getCmp(prototype.id + '-filterChange').setVisible(false);
                 Ext.getCmp(prototype.id + '-panelRbtDetail').setVisible(false);
                me.pagginActual = '-pagginA720';
                break;
            case  '-panelGridDataHistoric':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataIMF150':
                me.pagginActual = '-pagginIMF150';
                break;
            
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if( comboToYear.getValue() < comboFromYear.getValue()  ){
           comboFromYear.setValue(comboToYear.getValue()); 
        }
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if(comboFromDay.getValue() === ''){
            comboFromDay.setValue(obj.getValue());
        }
    },
    getPeriodoYYYYMM: function(strFormatDate) {
        if (!strFormatDate) return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            console.log(me.panelActual);
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    updateSummarySales: function(bean) {
        
        var tabMain = Ext.getCmp(prototype.id + '-panelMain');
       
        tabMain.setLoading('Cargando...');
       Ext.Ajax.request({
            url: prototype.url + '/updateSummarySales',
            method: 'POST',
            timeout: 600000, // 10 minutos en milisegundos
            params: bean,
            success: function(response) {
                tabMain.setLoading(false);
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    win.lblUser_toolTip("Estructura: IMF151");
                    console.log(result)
                    global.Msg({ msg: result.msjResult });
                    me.btnSearch_click();
                } else {
                    global.Msg({ msg: result.msjResult });
                }
            },
            failure: function(response) {
                tabMain.setLoading(false);
                global.Msg({ msg: 'Error en la comunicación con el servidor: ' + response.status });
            }
        });

    },
    btnExcel_clickPending: function (obj, e) {
        console.log('WAAAAAA')
        this.setFormatParameter();
        Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?..',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcelPending();
                    }
                }
            });
    },
    exportExcelPending: function () {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSXPendingAgent?beanString=' + encodeURI(searchParams.beanString));
    },
    rbChangeType: function (field, newvalue, oldvalue) {
        me.v_consulta = newvalue.rbgType;
        console.log(me.v_consulta);
        this.setFormatParameterDashboardSales(me.v_consulta);
        this.setGridDataDashbaordSales();
//        me.btnDisplay_click();
    },
    btnDisplay_click: function() {
       this.setFormatParameterDashboardSales();
       this.setGridDataDashbaordSales();
    },
   setFormatParameterDashboardSales: function () {
        me.bean = {};

        var cmp = Ext.getCmp(prototype.id + '-btnToggleSwitchSalesAgent');
        var isChecked = false;

        if (cmp && cmp.getEl()) {
            var inputEl = cmp.getEl().dom.querySelector('.toggle-input');
            isChecked = inputEl ? inputEl.checked : false;
        }

        var IN_QTY_OR_AMOUNT = isChecked ? 'AMOUNT' : 'QUANTITY';

        var rbtGroup = Ext.getCmp(prototype.id + '-rbtDetail');
        var selectedValue = null;
        if (rbtGroup) {
            var selected = rbtGroup.getValue();
            selectedValue = selected ? selected.rbD : null;
        }
        
        var rbg = Ext.getCmp(prototype.id + '-radiogroupType');
        var selected = rbg.getValue();      // devuelve algo como { rbgType: 'CL' }
        var selectedOption = selected ? selected.rbgType : null;

        me.bean.IN_OPTION = selectedOption;
        me.bean.IN_QTY_OR_AMOUNT = IN_QTY_OR_AMOUNT;
        me.bean.IN_DETAIL_TYPE = selectedValue;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log("searchParams:", searchParams);
    },

    setGridDataDashbaordSales: function () {
    const me = this;

    if (me.panelActual != '-panelDashboardSales') {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelDashboardSales';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
    }

    const panel = Ext.getCmp(prototype.id + '-panelDashboardSales');

    // 🌀 Mostrar loading
    const mask = new Ext.LoadMask({
        msg: 'Loading dashboard data...',
        target: panel
    });
    mask.show();

    // 🧩 Detectar estado del toggle (Quantity ↔ Amount)
    const toggleCmp = Ext.getCmp(prototype.id + '-btnToggleSwitchSalesAgent');
    const labelLeft = Ext.getCmp(prototype.id + '-COL');
    const labelRight = Ext.getCmp(prototype.id + '-EXT');
    const input = toggleCmp?.getEl()?.down('.toggle-input');
    const isChecked = input?.dom?.checked;

    // 🔹 Ajustar etiquetas según estado
    const labelText = isChecked ? 'USD' : 'Tickets';
    if (labelLeft) labelLeft.setText(labelText);
    if (labelRight) labelRight.setText(isChecked ? 'Tickets' : 'USD');

    // 🧭 Detectar radio button seleccionado
    const rbGroup = Ext.getCmp(prototype.id + '-radiogroupType');
    let selectedValue = rbGroup?.getValue()?.rbgType || 'CL'; // default Client
    let selectedLabel = 'Client'; // valor por defecto

    switch (selectedValue) {
        case 'CO': selectedLabel = 'Country'; break;
        case 'SO': selectedLabel = 'Source'; break;
        case 'CA': selectedLabel = 'Channel'; break;
        case 'AC': selectedLabel = 'Accreditation'; break;
        case 'RI': selectedLabel = 'Risk'; break;
        default: selectedLabel = 'Client';
    }

    // Crear el store remoto
    const storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
        proxy: {
            url: prototype.url + '/searchSalesDashboard'
        },
        listeners: {
            beforeload: function (obj) {
                obj.proxy.extraParams = searchParams;
            },
            load: function (store) {
                mask.hide();

                // 🔹 Convertir el store a arreglo simple
                const data = [];
                store.each(function (rec) {
                    data.push({
                        CODE: rec.get('CODE'),
                        QTY_TICKETS_SALES_AGENT: rec.get('QTY_TICKETS_SALES_AGENT')
                    });
                });

                data.sort((a, b) => a.QTY_TICKETS_SALES_AGENT - b.QTY_TICKETS_SALES_AGENT);

                // 🔹 Referenciar gráficos
                const chartBar = Ext.getCmp(prototype.id + '-chartElegant');
                const chartDonut = Ext.getCmp(prototype.id + '-chartDonut');

                if (!chartBar && !chartDonut) {
                    console.warn("⚠️ No se encontraron gráficos para actualizar.");
                    return;
                }

                // 🧠 🔸 Lógica: si es Country, solo mostramos el donut
                if (selectedValue === 'CO') {
                    chartBar.setHidden(true);
                    chartDonut.setHidden(false);
                } else {
                    chartBar.setHidden(false);
                    chartDonut.setHidden(false);
                }

                // 🔹 Gráfico de barras
                if (chartBar && !chartBar.hidden) {
                    chartBar.setStore({
                        fields: ['CODE', 'QTY_TICKETS_SALES_AGENT'],
                        data: data
                    });

                    const axes = chartBar.getAxes();
                    if (axes && axes.length > 0) {
                        axes[0].setTitle(isChecked ? 'Amount (USD)' : 'Tickets (Qty)');
                    }
                    if (axes && axes.length > 1) {
                        axes[1].setTitle(selectedLabel + ' (' + data.length + ')');
                    }

                    chartBar.redraw();
                }

                // 🔹 Gráfico de pastel / donut
                if (chartDonut) {
                    chartDonut.setStore({
                        fields: ['CODE', 'QTY_TICKETS_SALES_AGENT'],
                        data: data
                    });
                    chartDonut.redraw();

                    const storeDonut = chartDonut.getStore();
                    const legend = chartDonut.getLegend();
                    if (legend && storeDonut) {
                        const labels = [];
                        storeDonut.each(function (rec) {
                            const code = rec.get('CODE');
                            const qty = Ext.util.Format.number(rec.get('QTY_TICKETS_SALES_AGENT'), '0,0');
                            labels.push(`${code}: ${qty} ${isChecked ? 'USD' : 'tickets'}`);
                        });

                        const legendStore = legend.getStore ? legend.getStore() : null;
                        if (legendStore) {
                            legendStore.each(function (item, index) {
                                if (labels[index]) item.set('name', labels[index]);
                            });
                        }
                    }
                }

                console.log(`✅ Dashboard updated (${selectedLabel}) [${isChecked ? 'USD' : 'Tickets'} mode]`);
            }
        }
    });

    // Ejecutar carga
    storeGridDatas.load();

    // Paginador
    this.getPaggin();
}




}
);
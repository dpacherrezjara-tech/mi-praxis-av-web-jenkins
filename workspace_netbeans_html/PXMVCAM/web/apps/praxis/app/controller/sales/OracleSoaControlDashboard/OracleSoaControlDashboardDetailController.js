Ext.define('Ext.Praxis.controller.sales.OracleSoaControlDashboard.OracleSoaControlDashboardDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleSoaControlDashboardDetailController',
    meEle: "",
    p: '',
    bean: {},
    modBack: '',
    fuente: '',
    strVTR: '',
    gloCcust: '',
    strVoid: '',
    listaTkts: new Array(),
    lstRest: new Array(),
    gridCpnDataAC: new Array(),
    lstAGTN: new Array(),
    SQP00250Filter: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.DashboardDetail = {
            id: 'OracleSoaControlDashboardDetailForm',
            url: CONTEXTPATH+'/OracleSoaControlDashboard'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadTicketDashboardDetail(this.p.bean.IN_MODUL);
    },
    startDisplay: function() {
        Ext.getCmp(prototype.DashboardDetail.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    
    onResultLoadTicketDashboardDetail: function (res) {
        console.log(res.data);
        this.lstRest = res.data;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.DashboardDetail.id+'-gridDashboardDetail').focus();
            var SQP00250Filter = this.lstRest;
            
            //Ext.getCmp(prototype.DashboardDetail.id+'-gridDashboardDetail').getStore().removeAll();
            var objRow = {};
            var objRowPar = {};
            //<editor-fold defaultstate="collapsed" desc="gridDashboardDetailCTS">
            var listaRout = SQP00250Filter;
            this.gridCpnDataAC = new Array();
            for (var i = 0; i < listaRout.length; i++) {
                objRowPar = listaRout[i];
                objRow = {};
                objRow.A3702MODUL = objRowPar.A3702MODUL;
                objRow.FLAG = objRowPar.FLAG;
                objRow.A3702OBSER = objRowPar.A3702OBSER;
                objRow.FECCR = objRowPar.FECCR;
                objRow.HORCR = objRowPar.HORCR;
                objRow.A3702USRCR = objRowPar.A3702USRCR;                
                this.gridCpnDataAC.push(objRow);
            }
            
            Ext.getCmp(prototype.DashboardDetail.id+'-gridDashboardDetail').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            
        }
    },
    
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadTicketDashboardDetail">
    loadTicketDashboardDetail: function (IN_MODUL) {
        console.log(IN_MODUL);
        Ext.Ajax.request({
            url: prototype.DashboardDetail.url+'/searchDetail',
            method: 'POST',
            timeout: 60000000,
            params: {IN_MODUL: IN_MODUL},
            beforerequest: Ext.getCmp('OracleSoaControlDashboardDetailForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultLoadTicketDashboardDetail(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('OracleSoaControlDashboardDetailForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('OracleSoaControlDashboardDetailForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
   
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    }
});
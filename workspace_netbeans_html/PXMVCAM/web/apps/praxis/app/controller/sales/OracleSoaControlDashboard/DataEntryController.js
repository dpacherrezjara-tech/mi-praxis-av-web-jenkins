Ext.define('Ext.Praxis.controller.sales.OracleSoaControlDashboard.DataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryController',
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
    A1955Filter: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.Dashboard = {
            id: 'DataEntry',
            url: CONTEXTPATH+'/OracleSoaControlDashboard'
        };
    },
    afterRender: function() {
        this.startDisplay();
        console.log('bean:'+this.p.bean);
        console.log('A3701FLAG:'+ this.p.bean.A3701FLAG);
        console.log(prototype.Dashboard.url);
        console.log(prototype.Dashboard.id);
        console.log(prototype.id);
        if(this.p.bean.SCHEDULE === 1 && this.p.bean.A3701FLAG === 0)
            Ext.getCmp(prototype.id+'-panelShedule').setVisible(true);
        else
            Ext.getCmp(prototype.id+'-panelShedule').setVisible(false);
        this.loadDashboard();
    },
    startDisplay: function() {
        //Ext.getCmp(prototype.Dashboard.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    
    
    
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadDashboard">
    loadDashboard: function () {
        console.log(this.p.bean.A3701MODUL);
        console.log(this.p.bean.FLAG);

        Ext.getCmp(prototype.id + '-txtA3701MODUL').setValue(this.p.bean.A3701MODUL);
        Ext.getCmp(prototype.id + '-txtFLAG').setValue(this.p.bean.FLAG);
        Ext.getCmp(prototype.id + '-txtA3701HRINI').setValue("00:00");
        Ext.getCmp(prototype.id + '-txtA3701HRFIN').setValue("23:59");        
        
    },
    //</editor-fold>
     
    onUpdateClick: function(btn) {


        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        
        if (!this.validaRequiredFields()) {
            global.Msg({
                msg: 'Insert fields required. <br> Date Format YYYY/MM/DD. <br> Hour Format hh:mm'
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                        //var obj_params = this.getDataEntryValues(strOption);
                        //console.log(obj_params);
                    }
                }
            });
        }
    },
    crud: function() {
        var p = this.view.params;
        var strOption = p.action;
        var obj_params = this.getDataEntryValues(strOption);
        console.log(obj_params);
        Ext.Ajax.request({
            url: prototype.Dashboard.url + '/updateFlag',
            method: 'POST',
            timeout: 60000000,
            params: obj_params,
            beforerequest: Ext.getCmp('DataEntryOracleSoaControlDashboardForm').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var success = res.success;                
                console.log(res);
                if(success)
                {
                    Ext.getCmp('DataEntryOracleSoaControlDashboardForm').unmask('Loading...', '');
                    global.Msg({
                        msg: res.result == "OK" ? "Status changed" : "Cannot change the status",
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp('DataEntryOracleSoaControlDashboardForm').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                }
                else global.Msg({ msg: res.sesion });
            }
        });
    },
    onCancelClick: function(btn) {
        Ext.getCmp('DataEntryOracleSoaControlDashboardForm').close();
    },
   
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    },
    getDataEntryValues: function(strOption) {

        var IN_CCUST = "139";
        var IN_MODUL = Ext.getCmp(prototype.id + '-txtA3701MODUL').getValue();
        var IN_FLAG = this.p.bean.A3701FLAG === 0 ? 1 : 0;
        var SCHEDULE = this.p.bean.SCHEDULE;
        var IN_OBSER = Ext.getCmp(prototype.id + '-txtA3702OBSER').getValue();
        
        var IN_FECHA_INI = Ext.getCmp(prototype.id + '-txtA3701FCINI').getRawValue(); 
        var IN_HORA_INI = Ext.getCmp(prototype.id + '-txtA3701HRINI').getValue(); 
        var IN_FECHA_FIN = Ext.getCmp(prototype.id + '-txtA3701FCFIN').getRawValue();
        var IN_HORA_FIN = Ext.getCmp(prototype.id + '-txtA3701HRFIN').getValue();
        
        IN_FECHA_INI = global.replaceAll(IN_FECHA_INI.trim(),"/","");
        IN_HORA_INI = global.replaceAll(IN_HORA_INI.trim(),":","")+ "00";
        IN_FECHA_FIN = global.replaceAll(IN_FECHA_FIN.trim(),"/","");
        IN_HORA_FIN = global.replaceAll(IN_HORA_FIN.trim(),":","")+ "59";
        
        if(!Ext.getCmp(prototype.id + '-panelShedule').isVisible()){
            IN_FECHA_INI = "";
            IN_FECHA_FIN = "";
        }
        
        return {
            IN_CCUST: IN_CCUST,
            IN_MODUL: IN_MODUL,
            IN_FLAG: IN_FLAG,
            SCHEDULE: SCHEDULE,
            IN_OBSER: IN_OBSER,
            
            IN_FECHA_INI: IN_FECHA_INI,
            IN_HORA_INI: IN_HORA_INI,
            IN_FECHA_FIN: IN_FECHA_FIN,
            IN_HORA_FIN: IN_HORA_FIN            
        };
    },
    validaRequiredFields: function(){
	var bvalida = true;

        var txtA3701FCINI = Ext.getCmp(prototype.id + '-txtA3701FCINI').getRawValue();
        var txtA3701HRINI = Ext.getCmp(prototype.id + '-txtA3701HRINI').getValue();
        var txtA3701FCFIN = Ext.getCmp(prototype.id + '-txtA3701FCFIN').getRawValue();
        var txtA3701HRFIN = Ext.getCmp(prototype.id + '-txtA3701HRFIN').getValue();
        var txtA3702OBSER = Ext.getCmp(prototype.id + '-txtA3702OBSER').getValue();
	if(txtA3702OBSER.trim().length === 0)
	{
            bvalida = false;
	}	
	if(Ext.getCmp(prototype.id + '-panelShedule').isVisible()){
            if(
                global.replaceAll(txtA3701FCINI.trim(),"/","").length === 0 ||
                global.replaceAll(txtA3701HRINI.trim(),":","").length === 0 ||
                global.replaceAll(txtA3701FCFIN.trim(),"/","").length === 0 ||
                global.replaceAll(txtA3701HRFIN.trim(),":","").length === 0
            )
            {
                bvalida = false;
                console.log('length 1');
            }
            else if(
                global.replaceAll(txtA3701FCINI.trim(),"/","").length !== 8 ||
                global.replaceAll(txtA3701HRINI.trim(),":","").length !== 4 ||
                global.replaceAll(txtA3701FCFIN.trim(),"/","").length !== 8 ||
                global.replaceAll(txtA3701HRFIN.trim(),":","").length !== 4
            )
            {
                bvalida = false;
                console.log('length 2');
            }
            else if(
                txtA3701FCINI.trim().split("/").length !== 3 ||
                txtA3701HRINI.trim().split(":").length !== 2 ||
                txtA3701FCFIN.trim().split("/").length !== 3 ||
                txtA3701HRFIN.trim().split(":").length !== 2
            )
            {
                bvalida = false;
                console.log('split');
            }
            else if(
                    Ext.getCmp(prototype.id + '-txtA3701FCINI').getValue() > Ext.getCmp(prototype.id + '-txtA3701FCFIN').getValue()
            )
            {
                bvalida = false;
                console.log('date');
            }
            else{
                var horaIni = txtA3701HRINI.trim().split(":");
                var horaFin = txtA3701HRFIN.trim().split(":");
                if(parseInt(horaIni[0])<0 || parseInt(horaIni[0])>23)
                    bvalida = false;
                if(parseInt(horaIni[1])<0 || parseInt(horaIni[1])>59)
                    bvalida = false;
                if(parseInt(horaFin[0])<0 || parseInt(horaFin[0])>23)
                    bvalida = false;
                if(parseInt(horaFin[1])<0 || parseInt(horaFin[1])>59)
                    bvalida = false;
            }
	}
	return bvalida;
    }
});
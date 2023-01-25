Ext.define('Ext.Praxis.controller.sales.ConsortiumCommissions.ConsortiumCommissionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConsortiumCommissionsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    day: '',
    month: '',
    time: '',
    nameTxt: '',
    nameText2:'',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'ConsortiumCommissionsForm';
        prototype.url = CONTEXTPATH+'/ConsortiumCommissions';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 863;
        // </editor-fold>
        this.control({
        });
    },
    afterRender: function () {
        this.setValue('cbxType', 'C');
    },
    onProccessClick: function() {
        var type = this.getValue('cbxType');
        if (type !== '') {
            this.setFormatParameter(type);
            this.sendDataProcess();
        } else {
            global.Msg({
                msg: 'Select Type.'
            });
        }
    },
    onDownloadFileClick: function() {
        this.setFormatParameterDownloadText();
        this.downloadText();
    },
    onDownloadFile2Click: function() {
        this.setFormatParameterDownloadText2();
        this.downloadText();
    },
    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(type) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var year = new Date().getFullYear();
        this.month = new Date().getMonth()+1; 
        if(this.month < 10) this.month = "0"+this.month;
        this.day = new Date().getDate(); 
        if(this.day < 10) this.day = "0"+this.day;
        var fecha = year + '' +  this.month + '' + this.day;//YYYYMMDD
        this.time = new Date().getHours();
        // </editor-fold>
        console.log('year');
        console.log(year);
        console.log('month');
        console.log(this.month);
        console.log('day');
        console.log(this.day);
        console.log('fecha');
        console.log(fecha);
        console.log('type');
        console.log(type);
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_A1805CCUST: '139',
            IN_A1805APL: 'PX',
            IN_A1805CLIEN: type,
            IN_A1805POLIZ: 'AP',
            IN_A1805FECHA: fecha,
            IN_A1805BATCH: '',
            IN_A1805PROGA: 'CONSORCIO',
            IN_A1805MODO: 'S',
            IN_A1805FILE: '',
            IN_PARAM: '139'+fecha
//            ,OU_A1805STATU: cmb
        };
        // </editor-fold>
    },
    setFormatParameterDownloadText: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            nameFile: nameTxt,
            nameLote: 'L80COMCONS',
            strZona: '',
            strType: ''
        };
        // </editor-fold>
    },
    setFormatParameterDownloadText2: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        var type = this.getValue('cbxType');
        if (type == '') {
            global.Msg({
                msg: 'Select Type.'
            });
            return;
        }
        
        searchParams = {
            nameFile: nameTxt2,
            nameLote: 'L81COMCONS',
            strZona: '',
            strType: type
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    // </editor-fold>
    
    sendDataProcess: function() {
        var day =this.day;
        var month=this.month;
        var time=this.time;
        Ext.Ajax.request({
            url: prototype.url+'/proccessComission',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var status = res.lstProccess;
                    if (status==='C') {
                        nameTxt = 'E_PR_CONSORCIOS_'+day+global.getMonthAbrev(month)+'_'+time+'.txt';
                        nameTxt2 = 'D_PR_CONSORCIOS_'+day+global.getMonthAbrev(month)+'_'+time+'.txt';
                        
                        Ext.getCmp(prototype.id+'-btnDownloadFile').setText('<strong style="color:black;font-size:11px;">'+nameTxt+'</strong>');
                        Ext.getCmp(prototype.id+'-btnDownloadFile2').setText('<strong style="color:black;font-size:11px;">'+nameTxt2+'</strong>');
                        
                        Ext.getCmp(prototype.id+'-btnDownloadFile').show();
                        Ext.getCmp(prototype.id+'-btnDownloadFile2').show();
                        global.Msg({
                            msg: 'Completed process, Download File.'
                        });
                    } else if (status==='I') {
                        global.Msg({
                            msg: 'There is already a process in execution.'
                        });
                    } else {
                        global.Msg({
                            msg: 'Error in process.'
                        });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                var status = response.lstProccess;
                console.log('server-side failure with status code ,'+status);
            }
        });
    },
    downloadText: function() {
        
        var nameLote =searchParams.nameLote;
        var nameFile =searchParams.nameFile;
        var strZona=searchParams.strZona;
        var strType=searchParams.strType; 
        
        Ext.Msg.show({
            title: '.:PRAXIS:.-Confirm Download',
            msg: 'Please Confirm to proceed to download the file to your local machine',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    global.getFile(prototype.url + '/getFileTxt/?nameFile='+nameFile+'&nameLote='+nameLote+'&strZona='+strZona+'&strType=' + strType);
                }
            }
        });
        
        /*Ext.Ajax.request({
            url: prototype.url+'/downloadText',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var rutaFile = res.lstFile.split('|');
                    var strTexto = '';
                    if (rutaFile[2]!==undefined) {
                        if(rutaFile[2].toString()!=="0") {
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Download text file?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        
                                    } else {
                                    }
                                }
                            });
                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    } else {
                        global.Msg({
                            msg: res.lstFile
                        });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });*/
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
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

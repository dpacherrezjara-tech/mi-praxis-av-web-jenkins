Ext.define('Ext.Praxis.controller.sales.BPOProduction.BPOProductionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BPOProductionController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    bean: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'BPOProductionForm';
        prototype.url = CONTEXTPATH+'/BPOProduction';
        prototype.widthContenedor = 1514;
        prototype.widthGrid = 1277;
        // </editor-fold>
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            if (comboToYear.getValue()!=='') {
                if (newValue > comboToYear.getValue()) {
                    comboToYear.setValue(newValue);
                }
            } else comboToYear.setValue(newValue);
        } else {
            cmbDateFromMonth.setValue(newValue);
            comboToYear.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (comboFromYear.getValue()!=='') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else comboFromYear.setValue(newValue);
        } else {
            cmbDateToMonth.setValue(newValue);
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateFromYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboFromDay.setValue('');
            
            if (this.getValue("cmbDateFromYear")==='') this.setValue("cmbDateFromYear", new Date().getFullYear());
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboToMonth.getValue()!=='') {
                    if (newValue > comboToMonth.getValue()) {
                        comboToMonth.setValue(newValue);
                    }
                } else comboToMonth.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) comboToMonth.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateToYear"), Number(newValue) - 1);
            comboToDay.bindStore(store);
            comboToDay.setValue('');
            
            if (this.getValue("cmbDateFromYear")==='') this.setValue("cmbDateFromYear", new Date().getFullYear());
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboToDay.setValue(newValue);
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) comboFromMonth.setValue(newValue);
        }
    },
    onFromDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        var cmbDateToDay = Ext.getCmp(prototype.id+'-cmbDateToDay');
        if (newValue!=='') {
            if (comboFromMonth.getValue()==='') {
                comboFromMonth.setValue("01");
                if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                    cmbDateToMonth.setValue("01");
                    cmbDateToDay.setValue(newValue);
                }
            }
            comboFromDay.setValue(newValue);
        } else {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) comboToDay.setValue(newValue);
        }
    },
    onToDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        var cmbDateFromDay = Ext.getCmp(prototype.id+'-cmbDateFromDay');
        if (newValue!=='') {
            if (comboToMonth.getValue()==='') {
                comboToMonth.setValue("01");
                if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                    cmbDateFromMonth.setValue("01");
                    cmbDateFromDay.setValue(newValue);
                }
            }
            comboToDay.setValue(newValue);
        } else {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) comboFromDay.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);

        var days = new Array(); days.push(['', 'All']);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                autoLoad: true,
                data: days,
                fields: ['code', 'name']
            })
        );
        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                autoLoad: true,
                data: days,
                fields: ['code', 'name']
            })
        );
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        console.log(data);
        var file;
        Ext.getCmp(prototype.id+'-lbl_fecha_from').setText(this.bean.IN_DESDE);
        Ext.getCmp(prototype.id+'-lbl_fecha_to').setText(this.bean.IN_HASTA);
        var ValOpt1A = 0, ValOpt2AP = 0, ValOpt3AP = 0, ValOpt4AP = 0, ValOpt2AK = 0, ValOpt3AK = 0, ValOpt4AK = 0, ValOpt5A = 0;
        var ValOpt1B = 0, ValOpt2BP = 0, ValOpt3BP = 0, ValOpt4BP = 0, ValOpt2BK = 0, ValOpt3BK = 0, ValOpt4BK = 0, ValOpt5B = 0;
        var ValOpt1C = 0, ValOpt2CP = 0, ValOpt3CP = 0, ValOpt4CP = 0, ValOpt2CK = 0, ValOpt3CK = 0, ValOpt4CK = 0, ValOpt5C = 0;
        var ValOpt1D = 0, ValOpt2DP = 0, ValOpt3DP = 0, ValOpt4DP = 0, ValOpt2DK = 0, ValOpt3DK = 0, ValOpt4DK = 0, ValOpt5D = 0;
        var ValOpt1E = 0, ValOpt2EP = 0, ValOpt3EP = 0, ValOpt4EP = 0, ValOpt2EK = 0, ValOpt3EK = 0, ValOpt4EK = 0, ValOpt5E = 0;
        var ValOpt1F = 0, ValOpt2FP = 0, ValOpt3FP = 0, ValOpt4FP = 0, ValOpt2FK = 0, ValOpt3FK = 0, ValOpt4FK = 0, ValOpt5F = 0;
        for(var p = 0; p < this.getLengthGrid('gridReport'); p++){
            file = Ext.getCmp(prototype.id+'-gridReport').getStore().data.items[p].data;
            file.FUENTE = file.FUENTE === "ASR-MXN" ? "ASR-MX" : file.FUENTE;
            switch(file.FUENTE.trim()){
                case "ARC":
                    ValOpt1A+= file.QTY_DOCUM;
                    ValOpt5A+= file.QTY_GROUP;

                    ValOpt2AP+= file.QTY_ERR_IC;
                    ValOpt3AP+= file.QTY_ERR_SP;
                    ValOpt4AP+= file.QTY_GRUP_ABI;

                    ValOpt2AK+= file.QTY_OK_IC;
                    ValOpt3AK+= file.QTY_OK_SP;
                    ValOpt4AK+= file.QTY_GRUP_CER;
                    break;
                case "ASR-MX":
                    ValOpt1B+= file.QTY_DOCUM;
                    ValOpt5B+= file.QTY_GROUP;

                    ValOpt2BP+= file.QTY_ERR_IC;
                    ValOpt3BP+= file.QTY_ERR_SP;
                    ValOpt4BP+= file.QTY_GRUP_ABI;

                    ValOpt2BK+= file.QTY_OK_IC;
                    ValOpt3BK+= file.QTY_OK_SP;
                    ValOpt4BK+= file.QTY_GRUP_CER;
                    break;
                case "ASR-OTHER":
                    ValOpt1C+= file.QTY_DOCUM;
                    ValOpt5C+= file.QTY_GROUP;

                    ValOpt2CP+= file.QTY_ERR_IC;
                    ValOpt3CP+= file.QTY_ERR_SP;
                    ValOpt4CP+= file.QTY_GRUP_ABI;

                    ValOpt2CK+= file.QTY_OK_IC;
                    ValOpt3CK+= file.QTY_OK_SP;
                    ValOpt4CK+= file.QTY_GRUP_CER;
                    break;
                case "BSP-MX":
                    ValOpt1D+= file.QTY_DOCUM;
                    ValOpt5D+= file.QTY_GROUP;

                    ValOpt2DP+= file.QTY_ERR_IC;
                    ValOpt3DP+= file.QTY_ERR_SP;
                    ValOpt4DP+= file.QTY_GRUP_ABI;

                    ValOpt2DK+= file.QTY_OK_IC;
                    ValOpt3DK+= file.QTY_OK_SP;
                    ValOpt4DK+= file.QTY_GRUP_CER;
                    break;
                case "BSP-OTHER":
                    ValOpt1E+= file.QTY_DOCUM;
                    ValOpt5E+= file.QTY_GROUP;

                    ValOpt2EP+= file.QTY_ERR_IC;
                    ValOpt3EP+= file.QTY_ERR_SP;
                    ValOpt4EP+= file.QTY_GRUP_ABI;

                    ValOpt2EK+= file.QTY_OK_IC;
                    ValOpt3EK+= file.QTY_OK_SP;
                    ValOpt4EK+= file.QTY_GRUP_CER;
                    break;
                case "MAN":
                    ValOpt1F+= file.QTY_DOCUM;
                    ValOpt5F+= file.QTY_GROUP;

                    ValOpt2FP+= file.QTY_ERR_IC;
                    ValOpt3FP+= file.QTY_ERR_SP;
                    ValOpt4FP+= file.QTY_GRUP_ABI;

                    ValOpt2FK+= file.QTY_OK_IC;
                    ValOpt3FK+= file.QTY_OK_SP;
                    ValOpt4FK+= file.QTY_GRUP_CER;
                    break;
            }
        }
        this.setText('lblValor01A', Ext.util.Format.number(ValOpt1B, '0,000'));
        this.setText('lblValor02A', Ext.util.Format.number(ValOpt5B, '0,000'));
        this.setText('lblValor03A', Ext.util.Format.number(ValOpt2BP, '0,000') + " / " + Ext.util.Format.number(ValOpt2BK, '0,000'));
        this.setText('lblValor04A', Ext.util.Format.number(ValOpt3BP, '0,000') + " / " + Ext.util.Format.number(ValOpt3BK, '0,000'));
        this.setText('lblValor05A', Ext.util.Format.number(ValOpt4BP, '0,000') + " / " + Ext.util.Format.number(ValOpt4BK, '0,000'));
        
        this.setText('lblValor01B', Ext.util.Format.number(ValOpt1C, '0,000'));
        this.setText('lblValor02B', Ext.util.Format.number(ValOpt5C, '0,000'));
        this.setText('lblValor03B', Ext.util.Format.number(ValOpt2CP, '0,000') + " / " + Ext.util.Format.number(ValOpt2CK, '0,000'));
        this.setText('lblValor04B', Ext.util.Format.number(ValOpt3CP, '0,000') + " / " + Ext.util.Format.number(ValOpt3CK, '0,000'));
        this.setText('lblValor05B', Ext.util.Format.number(ValOpt4CP, '0,000') + " / " + Ext.util.Format.number(ValOpt4CK, '0,000'));
        
        this.setText('lblValor01C', Ext.util.Format.number(ValOpt1D, '0,000'));
        this.setText('lblValor02C', Ext.util.Format.number(ValOpt5D, '0,000'));
        this.setText('lblValor03C', Ext.util.Format.number(ValOpt2DP, '0,000') + " / " + Ext.util.Format.number(ValOpt2DK, '0,000'));
        this.setText('lblValor04C', Ext.util.Format.number(ValOpt3DP, '0,000') + " / " + Ext.util.Format.number(ValOpt3DK, '0,000'));
        this.setText('lblValor05C', Ext.util.Format.number(ValOpt4DP, '0,000') + " / " + Ext.util.Format.number(ValOpt4DK, '0,000'));
        
        this.setText('lblValor01D', Ext.util.Format.number(ValOpt1E, '0,000'));
        this.setText('lblValor02D', Ext.util.Format.number(ValOpt5E, '0,000'));
        this.setText('lblValor03D', Ext.util.Format.number(ValOpt2EP, '0,000') + " / " + Ext.util.Format.number(ValOpt2EK, '0,000'));
        this.setText('lblValor04D', Ext.util.Format.number(ValOpt3EP, '0,000') + " / " + Ext.util.Format.number(ValOpt3EK, '0,000'));
        this.setText('lblValor05D', Ext.util.Format.number(ValOpt4EP, '0,000') + " / " + Ext.util.Format.number(ValOpt4EK, '0,000'));
        
        this.setText('lblValor01E', Ext.util.Format.number(ValOpt1A, '0,000'));
        this.setText('lblValor02E', Ext.util.Format.number(ValOpt5A, '0,000'));
        this.setText('lblValor03E', Ext.util.Format.number(ValOpt2AP, '0,000') + " / " + Ext.util.Format.number(ValOpt2AK, '0,000'));
        this.setText('lblValor04E', Ext.util.Format.number(ValOpt3AP, '0,000') + " / " + Ext.util.Format.number(ValOpt3AK, '0,000'));
        this.setText('lblValor05E', Ext.util.Format.number(ValOpt4AP, '0,000') + " / " + Ext.util.Format.number(ValOpt4AK, '0,000'));
        
        this.setText('lblValor01F', Ext.util.Format.number(ValOpt1F, '0,000'));
        this.setText('lblValor02F', Ext.util.Format.number(ValOpt5F, '0,000'));
        this.setText('lblValor03F', Ext.util.Format.number(ValOpt2FP, '0,000') + " / " + Ext.util.Format.number(ValOpt2FK, '0,000'));
        this.setText('lblValor04F', Ext.util.Format.number(ValOpt3FP, '0,000') + " / " + Ext.util.Format.number(ValOpt3FK, '0,000'));
        this.setText('lblValor05F', Ext.util.Format.number(ValOpt4FP, '0,000') + " / " + Ext.util.Format.number(ValOpt4FK, '0,000'));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.bean.IN_AIRLINE = '139';
        
        var fyear = Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue();
        var fday = Ext.getCmp(prototype.id+'-cmbDateFromDay').getValue();
        
        var tyear = Ext.getCmp(prototype.id+'-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id+'-cmbDateToMonth').getValue();
        var tday = Ext.getCmp(prototype.id+'-cmbDateToDay').getValue();
        
        this.bean.IN_DESDE  = fyear+fmonth+fday;
        this.bean.IN_HASTA = tyear+tmonth+tday;
        
        this.loadSearch(this.bean);
    },
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(mes);
        var day = new Date().getDate()-4;
        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue(day);
        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue(day);
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridReport').getStore().removeAll();
        // </editor-fold>
    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    loadSearch: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.BPOProduction.GridData', {
            proxy: {
                url: prototype.url+'/loadSearch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1530");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        me.mostrarData(obj.data.items);
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridReport').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    getLengthGrid: function(grid) {
        return Ext.getCmp(prototype.id+'-'+grid).getStore().data.length;
    },
    setText: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setText(txt);
    },
    
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

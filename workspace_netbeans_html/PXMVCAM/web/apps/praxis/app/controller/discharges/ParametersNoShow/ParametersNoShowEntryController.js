/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.discharges.ParametersNoShow.ParametersNoShowEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ParametersNoShow',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
        //Inicializa STORE grid TD
        Ext.create('Ext.Praxis.store.discharges.GridData', {});
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs
        this.get_setCombo_load();
        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                this.handlerEvent_setDisabled(false);
                Ext.getCmp(prototype.id + '-A3931CPARM').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                this.handlerEvent_setDisabled(true);
                break;
        }
    },
    get_setCombo_load: function () {
        //console.log(Cmbkey);
        var bean = {};
        Ext.Ajax.request({
            url: prototype.url + '/getCmboCatalogo',
            timeout: 60000000,
            method: 'GET',
            params: bean,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-A3931ARCHI').setStore(res.data);
                //Ext.getCmp(prototype.id + '-A3931ARCHI').setValue();//default
            }
        });

    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        Ext.getCmp(prototype.id + '-A3931CPARM').setDisabled(bflag);
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-A3931CPARM').setValue(data.A3931CPARM);
        Ext.getCmp(prototype.id + '-A3931DESCR').setValue(data.A3931DESCR.trim());
        Ext.getCmp(prototype.id + '-A3931ORDEN').setValue(data.A3931ORDEN);
        Ext.getCmp(prototype.id + '-A3931APLIC').setValue(data.A3931APLIC);
        Ext.getCmp(prototype.id + '-A3931TIPO1').setValue(data.A3931TIPO1);
        Ext.getCmp(prototype.id + '-A3931PARM1').setValue(data.A3931PARM1.trim());
        if (data.A3931TIPO1 === 'D')
            Ext.getCmp(prototype.id + '-A3931PARM1_D').setValue(data.A3931PARM1.trim());
        if (data.A3931TIPO1 === 'N')
            Ext.getCmp(prototype.id + '-A3931PARM1_N').setValue(data.A3931PARM1.trim());
        if (data.A3931TIPO1 === 'I')
            Ext.getCmp(prototype.id + '-A3931PARM1_I').setValue(data.A3931PARM1.trim());

        Ext.getCmp(prototype.id + '-A3931TIPO2').setValue(data.A3931TIPO2);
        Ext.getCmp(prototype.id + '-A3931PARM2').setValue(data.A3931PARM2.trim());
        if (data.A3931TIPO2 === 'D')
            Ext.getCmp(prototype.id + '-A3931PARM2_D').setValue(data.A3931PARM2.trim());
        if (data.A3931TIPO2 === 'N')
            Ext.getCmp(prototype.id + '-A3931PARM2_N').setValue(data.A3931PARM2.trim());
        if (data.A3931TIPO2 === 'I')
            Ext.getCmp(prototype.id + '-A3931PARM2_I').setValue(data.A3931PARM2.trim());

        Ext.getCmp(prototype.id + '-A3931ARCHI').setValue(data.A3931ARCHI);
        Ext.getCmp(prototype.id + '-A3931ESTAD').setValue(data.A3931ESTAD);
        //AUDIT
        Ext.getCmp(prototype.id + '-A3931USRIN').setValue(data.A3931USRIN);
        Ext.getCmp(prototype.id + '-A3931FECIN').setValue(data.A3931FECIN);
        Ext.getCmp(prototype.id + '-A3931HORIN').setValue(data.A3931HORIN);
        Ext.getCmp(prototype.id + '-A3931USRAC').setValue(data.A3931USRAC);
        Ext.getCmp(prototype.id + '-A3931FECAC').setValue(data.A3931FECAC);
        Ext.getCmp(prototype.id + '-A3931HORAC').setValue(data.A3931HORAC);

    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A3931CPARM = Ext.getCmp(prototype.id + '-A3931CPARM').getValue();
        var VL_A3931DESCR = Ext.getCmp(prototype.id + '-A3931DESCR').getValue().trim();
        var VL_A3931ORDEN = Ext.getCmp(prototype.id + '-A3931ORDEN').getValue();
        var VL_A3931APLIC = Ext.getCmp(prototype.id + '-A3931APLIC').getValue();
        var VL_A3931TIPO1 = Ext.getCmp(prototype.id + '-A3931TIPO1').getValue();
        var VL_A3931PARM1 = Ext.getCmp(prototype.id + '-A3931PARM1').getValue();
        var VL_A3931ARCHI = '';
        if (VL_A3931TIPO1 === 'X')
            VL_A3931PARM1 = '';
        if (VL_A3931TIPO1 === 'D')
            VL_A3931PARM1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A3931PARM1_D').getValue(), 'Ymd');
        if (VL_A3931TIPO1 === 'N')
            VL_A3931PARM1 = Ext.getCmp(prototype.id + '-A3931PARM1_N').getValue();
        if (VL_A3931TIPO1 === 'I')
            VL_A3931PARM1 = Ext.getCmp(prototype.id + '-A3931PARM1_I').getValue();
        if (VL_A3931TIPO1 === 'C')
            VL_A3931ARCHI = Ext.getCmp(prototype.id + '-A3931ARCHI').getValue(); //.split('|')[0];

        var VL_A3931TIPO2 = Ext.getCmp(prototype.id + '-A3931TIPO2').getValue();
        var VL_A3931PARM2 = Ext.getCmp(prototype.id + '-A3931PARM2').getValue();
        if (VL_A3931TIPO2 === 'X')
            VL_A3931PARM2 = '';
        if (VL_A3931TIPO2 === 'D')
            VL_A3931PARM2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A3931PARM2_D').getValue(), 'Ymd');
        if (VL_A3931TIPO2 === 'N')
            VL_A3931PARM2 = Ext.getCmp(prototype.id + '-A3931PARM2_N').getValue();
        if (VL_A3931TIPO2 === 'I')
            VL_A3931PARM2 = Ext.getCmp(prototype.id + '-A3931PARM2_I').getValue();

        var VL_A3931ESTAD = Ext.getCmp(prototype.id + '-A3931ESTAD').getValue();

        return {
            VP_ACTION: VP_ACTION,
            A3931CPARM: VL_A3931CPARM,
            A3931DESCR: VL_A3931DESCR,
            A3931ORDEN: VL_A3931ORDEN,
            A3931APLIC: VL_A3931APLIC,
            A3931TIPO1: VL_A3931TIPO1,
            A3931PARM1: VL_A3931PARM1,
            A3931TIPO2: VL_A3931TIPO2,
            A3931PARM2: VL_A3931PARM2,
            A3931ARCHI: VL_A3931ARCHI,
            A3931ESTAD: VL_A3931ESTAD
        };
    },
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
        //var me = this;
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))
            },
            beforerequest: Ext.getCmp(prototype.id + '-ParametersNoShowEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-ParametersNoShowEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //culmino PROCESO                          
                        Ext.getCmp(prototype.id + '-ParametersNoShowEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });

    },
    onUpdateClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id + '-ParametersNoShowEntry').close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    validateForm: function (params) {
        var mensaje = "";
        var formulario = Ext.getCmp(prototype.id + '-DataEntry-center').getForm();
        //console.log(formulario.wasValid);
        //console.log(formulario.monitor.items.items);
        //console.log(formulario.getFields()); 
        var found = false;
        var vl_field = '';
        if (!formulario.wasValid) {
            formulario.getFields().each(function (field, index, length) {
                if (!field.isValid() && found === false) {
                    found = true;
                    vl_field = field.config.id;
                    mensaje = field.config.invalidText;
                }
            });
            Ext.getCmp(vl_field).focus();
            return mensaje;
        }

        //validaciones adicionales 
        if (params.A3931PARM1 === '' && params.A3931TIPO1 !== 'X') {
            mensaje = 'INGRESE VALOR PARAMETRO 1';
            Ext.getCmp(prototype.id + '-A3931PARM1').focus();
            return mensaje;
        }
        if (params.A3931PARM2 === '' && params.A3931TIPO2 !== 'X') {
            mensaje = 'INGRESE VALOR PARAMETRO 2';
            Ext.getCmp(prototype.id + '-A3931PARM2').focus();
            return mensaje;
        }
        if (params.A3931PARM1 === '' && params.A3931TIPO1 === 'C') {
            mensaje = 'SELECCIONE UN CATALOGO';
            Ext.getCmp(prototype.id + '-A3931ARCHI').focus();
            return mensaje;
        }
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS
        Ext.getCmp(prototype.id + '-A3931CPARM').setValue('');
        Ext.getCmp(prototype.id + '-A3931DESCR').setValue('');
        Ext.getCmp(prototype.id + '-A3931ORDEN').setValue('0');
        Ext.getCmp(prototype.id + '-A3931APLIC').setValue('Y');
        Ext.getCmp(prototype.id + '-A3931TIPO1').setValue('S');
        Ext.getCmp(prototype.id + '-A3931PARM1').setValue('');
        Ext.getCmp(prototype.id + '-A3931TIPO2').setValue('S');
        Ext.getCmp(prototype.id + '-A3931PARM2').setValue('');
        //Ext.getCmp(prototype.id + '-A3931ARCHI').setValue('');
        Ext.getCmp(prototype.id + '-A3931ESTAD').setValue('A');
    },
    cmb_tipo1_clickHandler: function () {
        var selectedValue = Ext.getCmp(prototype.id + '-A3931TIPO1').getValue();
        Ext.getCmp(prototype.id + '-A3931PARM1').enable();
        Ext.getCmp(prototype.id + '-A3931PARM1').hide();
        Ext.getCmp(prototype.id + '-A3931PARM1_D').hide();
        Ext.getCmp(prototype.id + '-A3931PARM1_N').hide();
        Ext.getCmp(prototype.id + '-A3931PARM1_I').hide();
        Ext.getCmp(prototype.id + '-A3931ARCHI').hide();
        Ext.getCmp(prototype.id + '-btn-ver-catalogo').hide();

        switch (selectedValue) {
            case 'X': //NO_APLICA
                Ext.getCmp(prototype.id + '-A3931PARM1').hide();
                break;
            case 'S'://ALFANUMERICO
                Ext.getCmp(prototype.id + '-A3931PARM1').show();
                Ext.getCmp(prototype.id + '-A3931PARM1').focus();
                break;
            case 'D'://DATE
                Ext.getCmp(prototype.id + '-A3931PARM1_D').show();
                Ext.getCmp(prototype.id + '-A3931PARM1_D').focus();
                break;
            case 'N'://NUMERICO
                Ext.getCmp(prototype.id + '-A3931PARM1_N').show();
                Ext.getCmp(prototype.id + '-A3931PARM1_N').focus();
                break;
            case 'I': //ENTERO
                Ext.getCmp(prototype.id + '-A3931PARM1_I').show();
                Ext.getCmp(prototype.id + '-A3931PARM1_I').focus();
                break;
            case 'C': //CATALOGO
                Ext.getCmp(prototype.id + '-A3931PARM1').show();
                Ext.getCmp(prototype.id + '-A3931PARM1').disable();
                Ext.getCmp(prototype.id + '-A3931ARCHI').show();
                Ext.getCmp(prototype.id + '-btn-ver-catalogo').show();
                Ext.getCmp(prototype.id + '-A3931ARCHI').select();
                break;
        }
    },
    cmb_tipo2_clickHandler: function () {
        var selectedValue = Ext.getCmp(prototype.id + '-A3931TIPO2').getValue();
        //console.log(selectedValue);        
        Ext.getCmp(prototype.id + '-A3931PARM2').hide();
        Ext.getCmp(prototype.id + '-A3931PARM2_D').hide();
        Ext.getCmp(prototype.id + '-A3931PARM2_N').hide();
        Ext.getCmp(prototype.id + '-A3931PARM2_I').hide();


        switch (selectedValue) {
            case 'X': //NO_APLICA
                Ext.getCmp(prototype.id + '-A3931PARM2').hide();
                break;
            case 'S'://ALFANUMERICO
                Ext.getCmp(prototype.id + '-A3931PARM2').show();
                Ext.getCmp(prototype.id + '-A3931PARM2').focus();
                break;
            case 'D'://DATE
                Ext.getCmp(prototype.id + '-A3931PARM2_D').show();
                Ext.getCmp(prototype.id + '-A3931PARM2_D').focus();
                break;
            case 'N'://NUMERICO
                Ext.getCmp(prototype.id + '-A3931PARM2_N').show();
                Ext.getCmp(prototype.id + '-A3931PARM2_N').focus();
                break;
            case 'I': //ENTERO
                Ext.getCmp(prototype.id + '-A3931PARM2_I').show();
                Ext.getCmp(prototype.id + '-A3931PARM2_I').focus();
                break;
        }
    },
    cmbCatalogo_clickHandler: function (obj, val) {

        Ext.getCmp(prototype.id + '-A3931PARM1').setValue('file=' + val.split('|')[0] + ' > key=' + val.split('|')[1]);

    },
    onbtnClick_verDetalle_catalogo: function () {
        var VL_A3975KEY1 = Ext.getCmp(prototype.id + '-A3931ARCHI').getValue();
        switch (VL_A3975KEY1.split('|')[1]) {
            case 'GB': //CATALOGO GOBIERNO 
                this.winDataEntry01('R', null);
                break;
            case 'TD': //CATALOGO CORPORATIVOS SI CADUCAN
                this.winDataEntry01('R', null);
                break;
            case 'TDN': //CATALOGO CORPORATIVOS NO CADUCAN
                this.winDataEntry01('R', null);
                break;    
            case 'PCC': //CATALOGO PRESTACIONES
                this.winDataEntry02('R', null);
                break;
        }

    },
    winDataEntry01: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var VL_A3975KEY1 = Ext.getCmp(prototype.id + '-A3931ARCHI').getValue();
        Ext.create('Ext.Praxis.view.discharges.ParametersNoShowForm.CatTickedDesignatorEntry', {
            id: prototype.id01 + '-CatTickedDesignatorEntry',
            params: {
                action: action,
                rec: rec,
                A3975KEY1: VL_A3975KEY1
            }
        }).show();
    },
    winDataEntry02: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var VL_A3975KEY1 = Ext.getCmp(prototype.id + '-A3931ARCHI').getValue();
        Ext.create('Ext.Praxis.view.discharges.ParametersNoShowForm.CatPrestacionesEntry', {
            id: prototype.id02 + '-CatPrestacionesEntry',
            params: {
                action: action,
                rec: rec,
                A3975KEY1: VL_A3975KEY1
            }
        }).show();
    }

});




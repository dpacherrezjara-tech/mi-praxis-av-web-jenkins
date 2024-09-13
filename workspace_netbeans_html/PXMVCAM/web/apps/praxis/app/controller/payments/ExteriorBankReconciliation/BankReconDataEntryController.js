Ext.define('Ext.Praxis.controller.payments.ExteriorBankReconciliation.BankReconDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankReconDataEntryController',
    url: CONTEXTPATH + '/BankReconciliationExt',
    bean: {},
    init: function (view) {
    },
    afterRender: async function () {
        this.view.mask('Loading...');
        await this.getData();
        this.view.unmask();
    },
    getData: async function () {
        const me = this;
        let params = me.formatParameters(me.view.obj);
        const res = await fetch(`${me.url}/loadStatementInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;

            form.reset();
            form.setValues(me.bean);
            if (me.bean.STVAL !== '3') {
                me.headers = data.headers;
                me.settlements = data.settlements;
                me.taxes = data.taxes;
                me.setMatchGrids();
                me.view.center();
            }
        }
    },
    setMatchGrids: function () {
        const me = this;
        const panelMatch = Ext.getCmp(prototype.idDE + '-panelMatch');
        const gridHeader = Ext.getCmp(prototype.idDE + '-gridHeadersMatch');
        const gridSettl = Ext.getCmp(prototype.idDE + '-gridSettlementsMatch');
        const gridTax = Ext.getCmp(prototype.idDE + '-gridTaxesMatch');
        
        if (me.headers.length > 0) {
            let storeHeader = new Ext.data.Store({
                data: me.headers
            });
            gridHeader.setStore(storeHeader);
            gridHeader.show();
        }

        if (me.settlements.length > 0) {
            let storeSettl = new Ext.data.Store({
                data: me.settlements
            });
            gridSettl.setStore(storeSettl);
            gridSettl.show();
        }

        if (me.taxes.length > 0) {
            let storeTax = new Ext.data.Store({
                data: me.taxes
            });
            gridTax.setStore(storeTax);
            gridTax.show();
        }
        panelMatch.show();
    },
    onCancelClick: function () {
        this.view.close();
    },
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros">
    formatParameters: function (obj) {
        let params = {
            IN_CCUST: obj.CCUST,
            IN_ADATE: obj.ADATE,
            IN_SOCIETY: obj.SOCIETY,
            IN_CODEBANK: obj.CODEBANK,
            IN_BANDOC: obj.BANDOC,
            IN_DATECI: obj.DATECI,
            IN_TRANCI: obj.TRANCI,
            IN_CODPRO: obj.CODPRO,
            IN_SEQPRO: obj.CCUSTPRO,
            IN_STVAL: obj.STVAL
        };
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    onCancelClick: function () {
        this.view.close();
    },
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    requestObjectSP: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    getFechaRango: function (fechaString) {
        // Convertir la cadena en un objeto Date
        const fecha = new Date(
                fechaString.substring(0, 4),
                fechaString.substring(4, 6) - 1,
                fechaString.substring(6, 8)
                );

        // Obtener la fecha +1 día
        const fechaMasUnDia = new Date(fecha);
        fechaMasUnDia.setDate(fecha.getDate() + 1);
        // Obtener la fecha -1 día
        const fechaMenosUnDia = new Date(fecha);
        fechaMenosUnDia.setDate(fecha.getDate() - 1);
        // Formatear las nuevas fechas como cadenas
        const fechaMasUnDiaString = fechaMasUnDia.toISOString().slice(0, 10).replace(/-/g, '');
        const fechaMenosUnDiaString = fechaMenosUnDia.toISOString().slice(0, 10).replace(/-/g, '');

        return [fechaMenosUnDiaString, fechaMasUnDiaString];
    },
    sumBy: function ( {data, key}){
        let sum = data.reduce(function (total, item) {
            return total + item[key];
        }, 0);
        return sum;
    }
    //</editor-fold>
});



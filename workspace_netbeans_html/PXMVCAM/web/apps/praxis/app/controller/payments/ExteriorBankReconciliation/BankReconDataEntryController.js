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

        const qtyHeaders = Ext.getCmp(prototype.idDE + '-txtQtyHeaders');
        const qtySales = Ext.getCmp(prototype.idDE + '-txtQtySettlSales');
        const qtyDebits = Ext.getCmp(prototype.idDE + '-txtQtySettlDebits');
        const qtyVoid = Ext.getCmp(prototype.idDE + '-txtQtySettlVoid');
        const qtyTaxes = Ext.getCmp(prototype.idDE + '-txtQtySettlTaxes');
        const qtySettl = Ext.getCmp(prototype.idDE + '-txtQtySettl');

        const totalHeaders = Ext.getCmp(prototype.idDE + '-txtTotalHeaders');
        const totalSales = Ext.getCmp(prototype.idDE + '-txtTotalSettlSales');
        const totalDebits = Ext.getCmp(prototype.idDE + '-txtTotalSettlDebits');
        const totalVoid = Ext.getCmp(prototype.idDE + '-txtTotalSettlVoid');
        const totalTaxes = Ext.getCmp(prototype.idDE + '-txtTotalSettlTaxes');
        const totalSettl = Ext.getCmp(prototype.idDE + '-txtTotalSettl');

        let tsettl = 0, ttax = 0;

        if (me.headers.length > 0) {
            let storeHeader = new Ext.data.Store({
                data: me.headers
            });
            gridHeader.setStore(storeHeader);
            gridHeader.show();
            qtyHeaders.setValue(storeHeader.getCount());
            if (me.headers.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
                totalHeaders.setValue(storeHeader.sum('NETO'));
            } else {
                totalHeaders.setValue(storeHeader.sum('IMPORTEPAG'));
            }
            qtyHeaders.show();
            totalHeaders.show();
        } else {
            qtyHeaders.hide();
            totalHeaders.hide();
        }

        if (me.settlements.length > 0) {
            let storeSettl = new Ext.data.Store({
                pageSize: 100, // Número de registros por página
                data: me.settlements,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            gridSettl.setStore(storeSettl);
            gridSettl.show();

            let contadores = global.countBy(me.settlements, 'TDOC');

            qtySales.setValue(contadores.S || 0);
            qtyDebits.setValue(contadores.D || 0);
            qtyVoid.setValue(contadores.V || 0);
            qtySettl.setValue(me.settlements.length);


            if (me.settlements.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
                totalSales.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'S'));
                totalDebits.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'D'));
                totalVoid.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'V'));
                tsettl = global.sumBy(me.settlements, 'NETO');

            } else {
                totalSales.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'S'));
                totalDebits.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'D'));
                totalVoid.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'V'));
                tsettl = global.sumBy(me.settlements, 'IMPORTEPAG');
                ;
            }
        }

        if (me.taxes.length > 0) {
            let storeTax = new Ext.data.Store({
                data: me.taxes
            });
            gridTax.setStore(storeTax);
            gridTax.show();
            qtyTaxes.setValue(storeTax.getCount());
            if (me.settlements.filter(x => x.MONEDAPAGO.trim().length === '') > 0) {
                totalTaxes.setValue(storeTax.sum('IMPORTE'));
                ttax = storeTax.sum('IMPORTE');
            } else {
                totalTaxes.setValue(storeTax.sum('IMPORTEPAG'));
                ttax = storeTax.sum('IMPORTEPAG');
            }
            gridSettl.setWidth('65%');
        } else {
            gridSettl.setWidth('100%');
        }

        totalSettl.setValue(tsettl + ttax);

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



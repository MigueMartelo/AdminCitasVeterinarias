import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = {
	cita: {
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	},
	error: false
};

class NuevaCita extends Component {
	state = { ...stateInicial };

	// Cuando el usuario escribe en los inputs
	handleChange = e => {
		// colocar lo que el usuario escribe en el state
		this.setState({
			cita: {
				...this.state.cita,
				[e.target.name]: e.target.value
			}
		});
	};

	// Cuando el usuario envia el formulario
	handleSubmit = e => {
		e.preventDefault();

		// Extraer valores del state
		const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

		// Validar que los campos esten llenos
		if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
			this.setState({ error: true });

			// detener la ejecución con un return
			return;
		}

		// Generar objeto con los datos
		const nuevaCita = { ...this.state.cita };
		nuevaCita.id = uuid();

		// Agregar la cita al state de App
		this.props.crearNuevaCita(nuevaCita);

		// Limpiar formulario y errores
		this.setState({ ...stateInicial });
	};

	render() {
		// extraer valor del state
		const { error } = this.state;

		return (
			<div className="card mt-5 py-5">
				<div className="card-body">
					<h2 className="card-title text-center mb-5">Llena el formulario para crear una nueva cita</h2>

					{error && <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios!</div>}

					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Nombre Mascota
							</label>
							<div className="col-sm-8 col-lg-10">
								<input
									type="text"
									name="mascota"
									className="form-control"
									placeholder="Nombre Mascota"
									onChange={this.handleChange}
									value={this.state.cita.mascota}
								/>
							</div>
						</div>
						{/* form group */}
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Nombre Dueño
							</label>
							<div className="col-sm-8 col-lg-10">
								<input
									type="text"
									name="propietario"
									className="form-control"
									placeholder="Nombre Dueño Mascota"
									onChange={this.handleChange}
									value={this.state.cita.propietario}
								/>
							</div>
						</div>
						{/* form group */}
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Fecha
							</label>
							<div className="col-sm-8 col-lg-4">
								<input
									type="date"
									name="fecha"
									className="form-control"
									onChange={this.handleChange}
									value={this.state.cita.fecha}
								/>
							</div>

							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Hora
							</label>
							<div className="col-sm-8 col-lg-4">
								<input
									type="time"
									name="hora"
									className="form-control"
									onChange={this.handleChange}
									value={this.state.cita.hora}
								/>
							</div>
						</div>
						{/* form group */}
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Sintomas
							</label>
							<div className="col-sm-8 col-lg-10">
								<textarea
									name="sintomas"
									className="form-control"
									placeholder="Describe los sintomas"
									onChange={this.handleChange}
									value={this.state.cita.sintomas}
								/>
							</div>
						</div>
						{/* form group */}
						<input type="submit" value="Agregar nueva cita" className="py-3 mt-2 btn btn-success btn-block" />
					</form>
				</div>
			</div>
		);
	}
}

NuevaCita.propTypes = {
	crearNuevaCita: PropTypes.func.isRequired
};

export default NuevaCita;

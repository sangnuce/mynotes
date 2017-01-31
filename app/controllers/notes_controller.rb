class NotesController < ApplicationController
  before_action :find_note, only: [:destroy, :update]

  def index
    respond_to do |format|
      format.html do
        @statuses = Note.statuses.keys
      end

      format.json do
        @notes = Note.order_desc(:created_at).paginate page: params[:page],
          per_page: Settings.notes.notes_per_page
        render json: {notes: @notes, total_pages: @notes.total_pages}
      end
    end
  end

  def create
    @note = Note.new note_params
    if @note.save
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def update
    if @note.update_attributes note_params
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def destroy
    message = if @note.destroy
      t "messages.delete_success"
    else
      t "messages.delete_failed"
    end
    render json: {message: message}
  end

  private
  def note_params
    params.require(:note).permit :title, :time, :content, :status
  end

  def find_note
    @note = Note.find_by id: params[:id]
    unless @note
      render json: {message: t("messages.not_found")}, status: :not_found
    end
  end
end

defmodule Marmite do
  @moduledoc """
  Documentation for Marmite.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Marmite.hello()
      :world

  """
  def hello do
    :world
  end

  def map([], _function), do: []

  def map([head | tail], function) do
    [function.(head) | map(tail, function)]
  end

  def mapper() do
    receive do
    {:map_for_me, sender, [list, function]} ->
    mapped = map(list, function)
  
    send(sender, {:result, mapped})
   
  end

  def sum() do
  receive do

end
end

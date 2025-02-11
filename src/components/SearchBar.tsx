
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  categories: string[];
  learningTypes: string[];
  difficultyLevels: string[];
  allTags: string[];
}

export interface SearchParams {
  query: string;
  category: string | null;
  learningType: string | null;
  difficultyLevel: string | null;
  tags: string[];
}

export function SearchBar({
  onSearch,
  categories,
  learningTypes,
  difficultyLevels,
  allTags,
}: SearchBarProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    category: null,
    learningType: null,
    difficultyLevel: null,
    tags: [],
  });

  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams, onSearch]);

  const handleTagToggle = (tag: string) => {
    setSearchParams((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleReset = () => {
    setSearchParams({
      query: "",
      category: null,
      learningType: null,
      difficultyLevel: null,
      tags: [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Input
            placeholder="Suchen..."
            value={searchParams.query}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, query: e.target.value }))
            }
            className="w-full"
          />
        </div>
        <Select
          value={searchParams.category ?? ""}
          onValueChange={(value) =>
            setSearchParams((prev) => ({
              ...prev,
              category: value || null,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Kategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle Kategorien</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={searchParams.difficultyLevel ?? ""}
          onValueChange={(value) =>
            setSearchParams((prev) => ({
              ...prev,
              difficultyLevel: value || null,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Schwierigkeitsgrad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Alle Schwierigkeitsgrade</SelectItem>
            {difficultyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={searchParams.tags.includes(tag) ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {(searchParams.query ||
        searchParams.category ||
        searchParams.difficultyLevel ||
        searchParams.tags.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Filter zurücksetzen
        </Button>
      )}
    </div>
  );
}
